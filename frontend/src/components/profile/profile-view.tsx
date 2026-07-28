"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut, PackageCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { ErrorState, LoadingState } from "@/components/ui/feedback";
import {
  useLogout,
  useMe,
  useOrders,
  useUpdateProfile
} from "@/features/api-hooks";
import { ApiError, money } from "@/lib/api-client";

const profileSchema = z.object({
  first_name: z.string().min(1, "Saisissez votre prénom.").max(150),
  last_name: z.string().min(1, "Saisissez votre nom.").max(150),
  phone: z.string().max(20)
});
type ProfileValues = z.infer<typeof profileSchema>;

const statusLabels: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  in_preparation: "En préparation",
  ready: "Prête",
  completed: "Terminée",
  cancelled: "Annulée"
};

export function ProfileView() {
  const router = useRouter();
  const me = useMe();
  const orders = useOrders(Boolean(me.data));
  const updateProfile = useUpdateProfile();
  const logout = useLogout();
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { first_name: "", last_name: "", phone: "" }
  });

  useEffect(() => {
    if (me.data) {
      form.reset({
        first_name: me.data.first_name,
        last_name: me.data.last_name,
        phone: me.data.phone
      });
    }
  }, [form, me.data]);

  if (me.isPending) return <LoadingState label="Chargement du profil…" />;
  if (me.error instanceof ApiError && [401, 403].includes(me.error.status)) {
    return (
      <section className="profile-guest">
        <UserRound aria-hidden="true" />
        <p className="kicker">Espace personnel</p>
        <h1>Connectez-vous pour retrouver vos commandes.</h1>
        <p>Votre panier anonyme sera rattaché au compte après la connexion.</p>
        <div>
          <Button asChild>
            <Link href="/login">Se connecter</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/register">Créer un compte</Link>
          </Button>
        </div>
      </section>
    );
  }
  if (me.isError || !me.data) {
    return (
      <div className="page-shell">
        <ErrorState message="Votre profil ne peut pas être chargé." />
      </div>
    );
  }

  async function save(values: ProfileValues) {
    try {
      await updateProfile.mutateAsync(values);
      toast.success("Profil mis à jour.");
    } catch (error) {
      toast.error(
        error instanceof ApiError ? error.message : "La modification a échoué."
      );
    }
  }

  async function signOut() {
    await logout.mutateAsync();
    router.push("/");
  }

  return (
    <section className="profile-layout">
      <aside className="profile-sidebar">
        <div className="avatar" aria-hidden="true">
          {me.data.first_name.slice(0, 1) || me.data.email.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h1>
            {me.data.first_name} {me.data.last_name}
          </h1>
          <p>{me.data.email}</p>
        </div>
        <button type="button" onClick={() => void signOut()} disabled={logout.isPending}>
          <LogOut aria-hidden="true" />
          Se déconnecter
        </button>
      </aside>

      <div className="profile-content">
        <section className="profile-section">
          <div className="profile-section__heading">
            <div>
              <p className="kicker">Coordonnées</p>
              <h2>Mes informations</h2>
            </div>
            <p>L’adresse e-mail est protégée et ne se modifie pas depuis cet écran.</p>
          </div>
          <form className="profile-form" onSubmit={form.handleSubmit(save)}>
            <label className="form-field">
              <span>Prénom</span>
              <input {...form.register("first_name")} />
              {form.formState.errors.first_name ? (
                <small className="field-error">
                  {form.formState.errors.first_name.message}
                </small>
              ) : null}
            </label>
            <label className="form-field">
              <span>Nom</span>
              <input {...form.register("last_name")} />
              {form.formState.errors.last_name ? (
                <small className="field-error">
                  {form.formState.errors.last_name.message}
                </small>
              ) : null}
            </label>
            <label className="form-field">
              <span>Téléphone</span>
              <input autoComplete="tel" {...form.register("phone")} />
            </label>
            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? "Enregistrement…" : "Enregistrer"}
            </Button>
          </form>
        </section>

        <section className="profile-section">
          <div className="profile-section__heading">
            <div>
              <p className="kicker">Historique</p>
              <h2>Mes commandes</h2>
            </div>
          </div>
          {orders.isPending ? <LoadingState /> : null}
          {orders.data?.length === 0 ? (
            <div className="empty-state empty-state--compact">
              <PackageCheck aria-hidden="true" />
              <h3>Aucune commande pour l’instant</h3>
              <p>Votre prochaine commande apparaîtra ici avec son statut.</p>
              <Link href="/restaurants">Découvrir les restaurants</Link>
            </div>
          ) : null}
          <div className="order-list">
            {orders.data?.map((order) => (
              <article className="order-row" key={order.public_id}>
                <div>
                  <span className="status status--order">
                    {statusLabels[order.status] ?? order.status}
                  </span>
                  <h3>{order.restaurant}</h3>
                  <p>
                    Commande {order.public_id.slice(0, 8).toUpperCase()} ·{" "}
                    {new Intl.DateTimeFormat("fr-FR", {
                      dateStyle: "medium",
                      timeStyle: "short"
                    }).format(new Date(order.created_at))}
                  </p>
                </div>
                <strong>{money(order.total)}</strong>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

