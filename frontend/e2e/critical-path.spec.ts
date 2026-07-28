import { expect, test } from "@playwright/test";

test("restaurant, configuration produit et panier", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Votre prochain plat"
  );

  await page.goto("/restaurants");
  await expect(page.getByText("L’Atelier du Burger", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Voir L’Atelier du Burger" }).click();
  await expect(page).toHaveURL(/\/restaurants\/atelier-du-burger$/);
  await expect(page.getByText("Le Signature", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Configurer Le Signature" }).click();
  await expect(page).toHaveURL(/\/products\/le-signature$/);
  await page.getByLabel("À point").check();
  await page.getByLabel("Cheddar affiné").check();
  await page.getByRole("button", { name: /Ajouter/ }).click();

  await expect(page).toHaveURL(/\/cart$/);
  await expect(page.getByText("Le Signature", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Augmenter" }).click();
  await expect(page.getByLabel("Quantité de Le Signature")).toContainText("2");
});

test("connexion et mise à jour du profil", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Adresse e-mail").fill("demo@komandgo.local");
  await page.getByLabel("Mot de passe").fill("Demo-Customer-2026!");
  await page.getByRole("button", { name: "Se connecter" }).click();

  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.getByText("demo@komandgo.local", { exact: true })).toBeVisible();
  await page.getByLabel("Prénom").fill("Camille");
  await page.getByRole("button", { name: "Enregistrer" }).click();
  await expect(page.getByText("Profil mis à jour")).toBeVisible();
});
