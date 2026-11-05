import { existsSync } from "node:fs";
import { features } from "web-features";
import { describe, expect, test } from "vitest";

type Workaround = {
  feature: string;
  files: string[];
  adopt: string;
};

const WORKAROUNDS: Workaround[] = [
  {
    feature: "dialog-closedby",
    files: ["src/lib/modal/modal.svelte"],
    adopt:
      'Put closedby="any" on the dialog and delete the backdrop pointerdown and click handlers.',
  },
];

describe.each(WORKAROUNDS)(
  "$feature workaround",
  ({ feature, files, adopt }) => {
    test("names a web-features feature", () => {
      const entry = features[feature];
      expect(entry, `${feature} isn't in web-features`).toBeDefined();
      expect(
        entry.kind,
        `${feature} was ${entry.kind} in web-features; update its id`,
      ).toBe("feature");
    });

    test("points at files that exist", () => {
      for (const file of files) {
        expect(existsSync(file), `${file} doesn't exist`).toBe(true);
      }
    });

    test("isn't Baseline yet", () => {
      const entry = features[feature];
      const baseline = entry.kind === "feature" && entry.status.baseline;
      expect(
        baseline,
        `${feature} is Baseline now. Adopt it in ${files.join(", ")}: ${adopt}`,
      ).toBe(false);
    });
  },
);
