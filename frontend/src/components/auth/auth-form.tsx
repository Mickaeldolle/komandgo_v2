"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Label from "@radix-ui/react-label";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useLogin, useRegister } from "@/features/api-hooks";
import { ApiError } from "@/lib/api-client";

const loginSchema = z.object({
  email: z.string().email("Saisissez une adresse e-mail valide."),
  password: z.string().min(1, "Saisissez votre mot de passe."),
});

const registerSchema = loginSchema.extend({
  password: z
    .string()
    .min(10, "Le mot de passe doit contenir au moins 10 caractères."),
  first_name: z.string().min(1, "Saisissez votre prénom.").max(150),
  last_name: z.string().min(1, "Saisissez votre nom.").max(150),
  phone: z.string().max(20),
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useLogin();
  const registerUser = useRegister();
  const isRegister = mode === "register";
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setIsHydrated(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const schema = isRegister ? registerSchema : loginSchema;
  const resolver = zodResolver(schema) as unknown as Resolver<RegisterValues>;
  const form = useForm<RegisterValues>({
    resolver,
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
    },
  });
  const pending = login.isPending || registerUser.isPending;

  async function submit(values: RegisterValues) {
    try {
      if (isRegister) {
        await registerUser.mutateAsync(values);
        toast.success("Votre compte est prêt.");
      } else {
        const credentials: LoginValues = {
          email: values.email,
          password: values.password,
        };
        await login.mutateAsync(credentials);
        toast.success("Connexion réussie.");
      }
      const next = searchParams.get("next");
      router.push(next?.startsWith("/") ? next : "/profile");
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof ApiError
            ? error.message
            : "La connexion au service a échoué. Réessayez.",
      });
    }
  }

  return (
    <section className="auth-layout">
      {/* <div className="auth-story">
        <p className="kicker">Votre table, partout</p>
        <h1>{isRegister ? "Un compte pour garder le fil." : "Ravi de vous revoir."}</h1>
        <p>
          Retrouvez votre panier après connexion, suivez vos commandes et mettez vos
          coordonnées à jour au même endroit.
        </p>
        <ul>
          <li>Session sécurisée par cookie HttpOnly</li>
          <li>Aucun jeton stocké dans le navigateur</li>
          <li>Prix toujours vérifiés côté serveur</li>
        </ul>
      </div> */}
      <form
        className="auth-form"
        method="post"
        onSubmit={form.handleSubmit(submit)}
      >
        <div>
          <h2>{isRegister ? "Créer mon compte" : "Se connecter"}</h2>
          <p>
            {isRegister ? "Déjà inscrit ?" : "Nouveau chez KomandGo ?"}{" "}
            <Link href={isRegister ? "/login" : "/register"}>
              {isRegister ? "Se connecter" : "Créer un compte"}
            </Link>
          </p>
        </div>
        {isRegister ? (
          <div className="form-grid">
            <Field
              id="first_name"
              label="Prénom"
              error={form.formState.errors.first_name?.message}
            >
              <input
                id="first_name"
                autoComplete="given-name"
                aria-invalid={Boolean(form.formState.errors.first_name)}
                aria-describedby={
                  form.formState.errors.first_name
                    ? "first_name-error"
                    : undefined
                }
                {...form.register("first_name")}
              />
            </Field>
            <Field
              id="last_name"
              label="Nom"
              error={form.formState.errors.last_name?.message}
            >
              <input
                id="last_name"
                autoComplete="family-name"
                aria-invalid={Boolean(form.formState.errors.last_name)}
                aria-describedby={
                  form.formState.errors.last_name
                    ? "last_name-error"
                    : undefined
                }
                {...form.register("last_name")}
              />
            </Field>
          </div>
        ) : null}
        <Field
          id="email"
          label="Adresse e-mail"
          error={form.formState.errors.email?.message}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(form.formState.errors.email)}
            aria-describedby={
              form.formState.errors.email ? "email-error" : undefined
            }
            {...form.register("email")}
          />
        </Field>
        <Field
          id="password"
          label="Mot de passe"
          error={form.formState.errors.password?.message}
        >
          <input
            id="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            aria-invalid={Boolean(form.formState.errors.password)}
            aria-describedby={
              form.formState.errors.password ? "password-error" : undefined
            }
            {...form.register("password")}
          />
        </Field>
        {isRegister ? (
          <Field
            id="phone"
            label="Téléphone (facultatif)"
            error={form.formState.errors.phone?.message}
          >
            <input
              id="phone"
              autoComplete="tel"
              aria-invalid={Boolean(form.formState.errors.phone)}
              aria-describedby={
                form.formState.errors.phone ? "phone-error" : undefined
              }
              {...form.register("phone")}
            />
          </Field>
        ) : null}
        {form.formState.errors.root ? (
          <p className="field-error" role="alert">
            {form.formState.errors.root.message}
          </p>
        ) : null}
        <Button
          className="button--wide"
          type="submit"
          disabled={pending || !isHydrated}
        >
          {pending
            ? "Vérification…"
            : isRegister
              ? "Créer mon compte"
              : "Se connecter"}
          <ArrowRight aria-hidden="true" />
        </Button>
      </form>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="form-field">
      <Label.Root htmlFor={id}>{label}</Label.Root>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
