import { beforeEach, describe, expect, it } from "vitest";

import { usePreferencesStore } from "./preferences-store";

describe("preferences store", () => {
  beforeEach(() => {
    usePreferencesStore.setState({ fulfillment: "pickup" });
  });

  it("keeps only the cross-page fulfillment preference", () => {
    usePreferencesStore.getState().setFulfillment("delivery");
    expect(usePreferencesStore.getState().fulfillment).toBe("delivery");
    expect(Object.keys(usePreferencesStore.getState())).not.toContain("cart");
  });
});

