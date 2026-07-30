import { expect, test } from "@playwright/test";

test("parcours complet de commande et validation", async ({ page }) => {
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

  await page.getByRole("button", { name: "Se connecter pour commander" }).click();
  await expect(page).toHaveURL(/\/login\?next=\/cart$/);
  await page.getByLabel("Adresse e-mail").fill("demo@komandgo.local");
  await page.getByLabel("Mot de passe").fill("Demo-Customer-2026!");
  await page.getByRole("button", { name: "Se connecter" }).click();

  await expect(page).toHaveURL(/\/cart$/);
  const orderResponsePromise = page.waitForResponse(
    (response) =>
      response.url().endsWith("/api/v1/orders/") &&
      response.request().method() === "POST"
  );
  await page.getByRole("button", { name: "Commander", exact: true }).click();
  const orderResponse = await orderResponsePromise;
  expect(orderResponse.status()).toBe(201);
  const order = (await orderResponse.json()) as { public_id: string };

  await expect(page).toHaveURL(/\/profile$/);
  const shortNumber = order.public_id.slice(0, 8).toUpperCase();
  await expect(
    page.locator(".order-row").getByText(`Commande ${shortNumber}`, { exact: false })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Panier, 0 article(s)" })
  ).toBeVisible();
});

test("le menu mobile priorise les produits", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Contrôle réservé au viewport mobile");
  await page.goto("/restaurants/atelier-du-burger");
  await expect(page.getByText("Le Signature", { exact: true })).toBeVisible();

  await expect(page.locator(".restaurant-hero__photo")).toBeHidden();
  await expect(page.locator(".restaurant-hero__description")).toBeHidden();
  await expect(page.locator(".restaurant-hero__address")).toBeHidden();

  const heroBox = await page.locator(".restaurant-hero").boundingBox();
  const firstProductBox = await page.locator(".product-card").first().boundingBox();
  const viewport = page.viewportSize();

  expect(heroBox).not.toBeNull();
  expect(firstProductBox).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(heroBox!.height).toBeLessThanOrEqual(240);
  expect(firstProductBox!.y).toBeLessThan(viewport!.height);
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
