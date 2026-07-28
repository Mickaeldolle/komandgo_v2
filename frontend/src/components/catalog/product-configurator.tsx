"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Label from "@radix-ui/react-label";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useAddCartItem } from "@/features/api-hooks";
import { ApiError, money } from "@/lib/api-client";
import type { Product } from "@/lib/schemas";

const formSchema = z.object({
  quantity: z.number().int().min(1).max(20),
  option_ids: z.array(z.number().int().positive()),
  note: z.string().max(300)
});

type FormValues = z.infer<typeof formSchema>;

export function ProductConfigurator({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useAddCartItem();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { quantity: 1, option_ids: [], note: "" }
  });
  const quantity = useWatch({ control, name: "quantity" });
  const optionIds = useWatch({ control, name: "option_ids" });
  const selectedOptions = useMemo(
    () =>
      product.option_groups
        .flatMap((group) => group.options)
        .filter((option) => optionIds.includes(option.id)),
    [optionIds, product.option_groups]
  );
  const unitPrice =
    Number(product.price) +
    selectedOptions.reduce((total, option) => total + Number(option.price_delta), 0);

  const submit = handleSubmit(async (values) => {
    let invalid = false;
    for (const group of product.option_groups) {
      const count = group.options.filter((option) => values.option_ids.includes(option.id)).length;
      if (count < group.minimum || count > group.maximum) {
        invalid = true;
        setError("option_ids", {
          message: `${group.name} : choisissez entre ${group.minimum} et ${group.maximum}.`
        });
        break;
      }
    }
    if (invalid) return;

    try {
      await addItem.mutateAsync({
        product_id: product.id,
        quantity: values.quantity,
        option_ids: values.option_ids,
        note: values.note
      });
      toast.success("Produit ajouté au panier");
      router.push("/cart");
    } catch (error) {
      toast.error(
        error instanceof ApiError ? error.message : "Le produit n’a pas pu être ajouté."
      );
    }
  });

  return (
    <form className="configurator" onSubmit={submit}>
      {product.option_groups.map((group) => (
        <fieldset key={group.id}>
          <legend>
            <span>{group.name}</span>
            <small>
              {group.minimum === group.maximum
                ? `${group.minimum} choix`
                : `${group.minimum} à ${group.maximum} choix`}
            </small>
          </legend>
          {group.description ? <p>{group.description}</p> : null}
          <div className="option-list">
            {group.options.map((option) => (
              <label
                className={`option-row ${option.is_available ? "" : "option-row--disabled"}`}
                key={option.id}
              >
                <input
                  type={group.maximum === 1 ? "radio" : "checkbox"}
                  name={`option-group-${group.id}`}
                  value={option.id}
                  disabled={!option.is_available}
                  checked={optionIds.includes(option.id)}
                  onChange={(event) => {
                    const idsFromGroup = new Set(
                      group.options.map((groupOption) => groupOption.id)
                    );
                    const withoutCurrentGroup = optionIds.filter(
                      (id) => !idsFromGroup.has(id)
                    );
                    const nextIds = event.target.checked
                      ? group.maximum === 1
                        ? [...withoutCurrentGroup, option.id]
                        : [...optionIds, option.id]
                      : optionIds.filter((id) => id !== option.id);
                    setValue("option_ids", nextIds, {
                      shouldDirty: true,
                      shouldValidate: true
                    });
                  }}
                />
                <span>{option.name}</span>
                <strong>
                  {Number(option.price_delta) > 0
                    ? `+ ${money(option.price_delta)}`
                    : "Inclus"}
                </strong>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      {errors.option_ids ? (
        <p className="field-error" role="alert">
          {errors.option_ids.message}
        </p>
      ) : null}

      <Label.Root className="field-label" htmlFor="note">
        Une précision pour la cuisine <span>facultatif</span>
      </Label.Root>
      <textarea
        id="note"
        rows={3}
        placeholder="Ex. sauce à part"
        aria-invalid={Boolean(errors.note)}
        {...register("note")}
      />

      <div className="configurator__submit">
        <div className="quantity-control" aria-label="Quantité">
          <button
            type="button"
            aria-label="Diminuer la quantité"
            onClick={() => setValue("quantity", Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus aria-hidden="true" />
          </button>
          <output aria-live="polite">{quantity}</output>
          <button
            type="button"
            aria-label="Augmenter la quantité"
            onClick={() => setValue("quantity", Math.min(20, quantity + 1))}
            disabled={quantity >= 20}
          >
            <Plus aria-hidden="true" />
          </button>
        </div>
        <Button type="submit" disabled={addItem.isPending || !product.is_available}>
          <ShoppingBag aria-hidden="true" />
          {addItem.isPending ? "Ajout…" : `Ajouter · ${money(unitPrice * quantity)}`}
        </Button>
      </div>
    </form>
  );
}

