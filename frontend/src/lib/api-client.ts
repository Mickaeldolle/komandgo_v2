import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

const errorEnvelopeSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    fields: z.unknown().nullable().optional()
  })
});

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
    readonly fields?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function cookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const prefix = `${name}=`;
  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  return value ? decodeURIComponent(value.slice(prefix.length)) : undefined;
}

async function csrfToken(): Promise<string> {
  const existing = cookie("csrftoken");
  if (existing) return existing;
  const response = await fetch(`${API_URL}/auth/csrf/`, {
    credentials: "include",
    cache: "no-store"
  });
  if (!response.ok) {
    throw new ApiError("Impossible d’initialiser la session sécurisée.", response.status, "csrf");
  }
  const payload = z.object({ csrfToken: z.string() }).parse(await response.json());
  return payload.csrfToken;
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiRequest<T>(
  path: string,
  schema: z.ZodType<T>,
  options: RequestOptions = {}
): Promise<T> {
  const method = options.method?.toUpperCase() ?? "GET";
  const mutating = !["GET", "HEAD", "OPTIONS"].includes(method);
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body !== undefined) headers.set("Content-Type", "application/json");
  if (mutating) headers.set("X-CSRFToken", await csrfToken());

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    credentials: "include",
    cache: "no-store"
  });

  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null);
    const parsed = errorEnvelopeSchema.safeParse(payload);
    if (parsed.success) {
      throw new ApiError(
        parsed.data.error.message,
        response.status,
        parsed.data.error.code,
        parsed.data.error.fields
      );
    }
    throw new ApiError(
      "Le service est momentanément indisponible. Réessayez.",
      response.status,
      "network_error"
    );
  }

  if (response.status === 204) return schema.parse(undefined);
  return schema.parse(await response.json());
}

export function money(value: string | number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(Number(value));
}

