import { baseClasses, type Color, type Shape } from "#lib/base.js";
import { cn } from "#lib/utils.js";

export const INPUT_VARIANTS = ["outlined", "filled", "plain"] as const;
export type InputVariant = (typeof INPUT_VARIANTS)[number];

export const fieldClasses = ({
  variant,
  color,
  shape,
}: {
  variant: InputVariant;
  color: Color;
  shape: Shape;
}) =>
  cn(
    "min-w-0 bg-transparent placeholder:text-m3-on-surface-variant focus-visible:outline-2 disabled:cursor-not-allowed disabled:text-m3-on-surface/38 disabled:placeholder:text-m3-on-surface/38",

    variant === "outlined" &&
      "bg-m3-surface-container-lowest outline-1 outline-m3-outline hover:outline-m3-on-surface disabled:outline-m3-on-surface/12",
    variant === "filled" &&
      "border-b border-m3-on-surface-variant bg-m3-surface-container-highest hover:border-m3-on-surface disabled:border-m3-on-surface/38 disabled:bg-m3-on-surface/4",

    color === "primary" && "focus-visible:outline-m3-primary",
    color === "secondary" && "focus-visible:outline-m3-secondary",
    color === "tertiary" && "focus-visible:outline-m3-tertiary",
    color === "error" && "focus-visible:outline-m3-error",
    (color === "plain" || color === "inherit") &&
      "focus-visible:outline-current",

    "user-invalid:border-m3-error user-invalid:outline-m3-error user-invalid:focus-visible:outline-m3-error aria-invalid:border-m3-error aria-invalid:outline-m3-error",

    baseClasses({ shape }),
  );
