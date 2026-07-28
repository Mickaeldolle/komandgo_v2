"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/ui/feedback";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page rendering error", { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <div className="page-shell">
      <ErrorState
        message="Une erreur inattendue a interrompu l’affichage."
        onRetry={reset}
      />
    </div>
  );
}

