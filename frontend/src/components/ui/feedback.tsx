import { AlertTriangle, LoaderCircle } from "lucide-react";

export function LoadingState({ label = "Chargement…" }: { label?: string }) {
  return (
    <div className="feedback" role="status">
      <LoaderCircle className="spin" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="feedback feedback--error" role="alert">
      <AlertTriangle aria-hidden="true" />
      <div>
        <strong>Impossible d’afficher cette page</strong>
        <p>{message}</p>
        {onRetry ? (
          <button className="text-button" type="button" onClick={onRetry}>
            Réessayer
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="skeleton-list" aria-label="Chargement du contenu">
      {[0, 1, 2].map((item) => (
        <div className="skeleton-row" key={item} />
      ))}
    </div>
  );
}

