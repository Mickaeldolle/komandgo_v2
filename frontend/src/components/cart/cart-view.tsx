"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { ErrorState, SkeletonList } from "@/components/ui/feedback";
import {
  useCart,
  useCheckout,
  useMe,
  useRemoveCartItem,
  useRestaurant,
  useUpdateCartItem
} from "@/features/api-hooks";
import { ApiError, money } from "@/lib/api-client";
import {
  type Fulfillment,
  usePreferencesStore
} from "@/stores/preferences-store";

const checkoutSchema = z.object({
  delivery_address: z.string().max(300),
  comment: z.string().max(500)
});
type CheckoutValues = z.infer<typeof checkoutSchema>;

export function CartView() {
  const router = useRouter();
  const cart = useCart();
  const me = useMe();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const checkout = useCheckout();
  const fulfillment = usePreferencesStore((state) => state.fulfillment);
  const setFulfillment = usePreferencesStore((state) => state.setFulfillment);
  const restaurant = useRestaurant(cart.data?.restaurant?.slug ?? "");
  const { register, handleSubmit, setError, formState } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { delivery_address: "", comment: "" }
  });

  if (cart.isPending) return <SkeletonList />;
  if (cart.isError) {
    return (
      <div className="page-shell">
        <ErrorState
          message="Le panier ne peut pas être chargé."
          onRetry={() => void cart.refetch()}
        />
      </div>
    );
  }
  if (!cart.data.id || cart.data.items.length === 0) {
    return (
      <section className="empty-cart">
        <div className="empty-cart__icon">
          <ShoppingBag aria-hidden="true" />
        </div>
        <p className="kicker">Votre sélection</p>
        <h1>Le panier attend son premier plat.</h1>
        <p>Parcourez un menu et configurez un produit pour commencer.</p>
        <Button asChild>
          <Link href="/restaurants">
            Voir les restaurants <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </section>
    );
  }

  const currentRestaurant = restaurant.data;
  const services: { value: Fulfillment; label: string; enabled: boolean }[] = [
    {
      value: "pickup",
      label: "À emporter",
      enabled: currentRestaurant?.pickup_enabled ?? true
    },
    {
      value: "delivery",
      label: currentRestaurant
        ? `Livraison · ${money(currentRestaurant.delivery_fee)}`
        : "Livraison",
      enabled: currentRestaurant?.delivery_enabled ?? false
    },
    {
      value: "onsite",
      label: "Sur place",
      enabled: currentRestaurant?.onsite_enabled ?? false
    }
  ];
  const selectedService = services.find(
    (service) => service.value === fulfillment && service.enabled
  );
  const resolvedFulfillment =
    selectedService?.value ?? services.find((service) => service.enabled)?.value;
  const deliveryFee =
    resolvedFulfillment === "delivery" && currentRestaurant
      ? Number(currentRestaurant.delivery_fee)
      : 0;
  const total = Number(cart.data.subtotal) + deliveryFee;

  const submit = handleSubmit(async (values) => {
    if (!resolvedFulfillment) {
      toast.error("Aucun mode de commande n’est disponible pour ce restaurant.");
      return;
    }
    if (
      resolvedFulfillment === "delivery" &&
      !values.delivery_address.trim()
    ) {
      setError(
        "delivery_address",
        { type: "manual", message: "Saisissez une adresse complète." },
        { shouldFocus: true }
      );
      return;
    }
    if (!me.data) {
      router.push("/login?next=/cart");
      return;
    }
    try {
      const order = await checkout.mutateAsync({
        fulfillment: resolvedFulfillment,
        accepted_total: total.toFixed(2),
        delivery_address: values.delivery_address,
        comment: values.comment
      });
      toast.success(`Commande ${order.public_id.slice(0, 8).toUpperCase()} créée`);
      router.push("/profile");
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "La commande n’a pas pu être validée."
      );
      void cart.refetch();
    }
  });

  return (
    <section className="cart-layout">
      <div className="cart-main">
        <div className="cart-heading">
          <div>
            <p className="kicker">Votre sélection</p>
            <h1>Panier</h1>
          </div>
          <Link href={`/restaurants/${cart.data.restaurant?.slug}`}>
            Continuer chez {cart.data.restaurant?.name}
          </Link>
        </div>

        <div className="cart-items">
          {cart.data.items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item__image">
                <Image
                  src={item.image_url || "/demo/catalog/food-42-king-burger.png"}
                  alt=""
                  fill
                  sizes="96px"
                />
              </div>
              <div className="cart-item__content">
                <div className="cart-item__top">
                  <div>
                    <h2>{item.product_name}</h2>
                    {item.selections.map((selection) => (
                      <p key={selection.id}>{selection.option_name}</p>
                    ))}
                    {item.note ? <p>Note : {item.note}</p> : null}
                  </div>
                  <strong>{money(item.line_total)}</strong>
                </div>
                {!item.is_available ? (
                  <p className="field-error">Ce produit n’est plus disponible.</p>
                ) : null}
                <div className="cart-item__actions">
                  <div className="quantity-control" aria-label={`Quantité de ${item.product_name}`}>
                    <button
                      type="button"
                      aria-label="Diminuer"
                      disabled={item.quantity <= 1 || updateItem.isPending}
                      onClick={() =>
                        updateItem.mutate(
                          {
                            itemId: item.id,
                            quantity: item.quantity - 1
                          },
                          {
                            onError: (error) =>
                              toast.error(
                                error instanceof ApiError
                                  ? error.message
                                  : "La quantité n’a pas pu être modifiée."
                              )
                          }
                        )
                      }
                    >
                      <Minus aria-hidden="true" />
                    </button>
                    <output>{item.quantity}</output>
                    <button
                      type="button"
                      aria-label="Augmenter"
                      disabled={item.quantity >= 99 || updateItem.isPending}
                      onClick={() =>
                        updateItem.mutate(
                          {
                            itemId: item.id,
                            quantity: item.quantity + 1
                          },
                          {
                            onError: (error) =>
                              toast.error(
                                error instanceof ApiError
                                  ? error.message
                                  : "La quantité n’a pas pu être modifiée."
                              )
                          }
                        )
                      }
                    >
                      <Plus aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    type="button"
                    disabled={removeItem.isPending}
                    onClick={() =>
                      removeItem.mutate(item.id, {
                        onError: (error) =>
                          toast.error(
                            error instanceof ApiError
                              ? error.message
                              : "Le produit n’a pas pu être supprimé."
                          )
                      })
                    }
                  >
                    <Trash2 aria-hidden="true" />
                    Supprimer
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="cart-summary">
        <h2>Récapitulatif</h2>
        <fieldset className="fulfillment-switch">
          <legend>Mode de commande</legend>
          {services.map((service) => (
            <label key={service.value}>
              <input
                type="radio"
                name="fulfillment"
                value={service.value}
                checked={resolvedFulfillment === service.value}
                disabled={!service.enabled}
                onChange={() => setFulfillment(service.value)}
              />
              <span>{service.label}</span>
            </label>
          ))}
        </fieldset>
        <form onSubmit={submit}>
          {resolvedFulfillment === "delivery" ? (
            <label className="form-field">
              <span>Adresse de livraison</span>
              <textarea
                id="delivery_address"
                rows={3}
                placeholder="Numéro, rue, code postal et ville"
                aria-invalid={Boolean(formState.errors.delivery_address)}
                aria-describedby={
                  formState.errors.delivery_address
                    ? "delivery_address-error"
                    : undefined
                }
                {...register("delivery_address")}
              />
              {formState.errors.delivery_address ? (
                <span
                  id="delivery_address-error"
                  className="field-error"
                  role="alert"
                >
                  {formState.errors.delivery_address.message}
                </span>
              ) : null}
            </label>
          ) : null}
          <label className="form-field">
            <span>Commentaire <small>facultatif</small></span>
            <textarea rows={2} placeholder="Une précision utile…" {...register("comment")} />
          </label>
          <dl className="price-breakdown">
            <div>
              <dt>Sous-total</dt>
              <dd>{money(cart.data.subtotal)}</dd>
            </div>
            {deliveryFee > 0 ? (
              <div>
                <dt>Livraison</dt>
                <dd>{money(deliveryFee)}</dd>
              </div>
            ) : null}
            <div className="price-breakdown__total">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
          <Button
            className="button--wide"
            type="submit"
            disabled={
              checkout.isPending ||
              !resolvedFulfillment ||
              cart.data.items.some((item) => !item.is_available)
            }
          >
            {checkout.isPending
              ? "Validation…"
              : me.data
                ? "Commander"
                : "Se connecter pour commander"}
          </Button>
          <p className="secure-note">
            Le total est recalculé et contrôlé par KomandGo avant création.
          </p>
        </form>
      </aside>
    </section>
  );
}

