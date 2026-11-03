import { cn } from "#lib/utils.js";

export const VARIANTS = [
  "elevated",
  "filled",
  "tonal",
  "outlined",
  "plain",
  "text",
] as const;
export type Variant = (typeof VARIANTS)[number];
export type VariantProp = { variant?: Variant };

export const COLORS = [
  "primary",
  "secondary",
  "tertiary",
  "error",
  "plain",
  "inherit",
] as const;
export type Color = (typeof COLORS)[number];
export type ColorProp = { color?: Color };

export const SHAPES = ["square", "rounded", "circle"] as const;
export type Shape = (typeof SHAPES)[number];
export type ShapeProp = { shape?: Shape };

export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export type Size = (typeof SIZES)[number];
export type SizeProp = { size?: Size };

export const RADII = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "full",
] as const;
export type Radius = (typeof RADII)[number];
export type RadiusProp = { radius?: Radius };

export const UNDERLINES = ["always", "hover", "none"] as const;
export type Underline = (typeof UNDERLINES)[number];
export type UnderlineProp = { underline?: Underline };

export type Variants = VariantProp & ColorProp & ShapeProp;

export type BaseClassOptions = Variants &
  UnderlineProp & {
    hover?: boolean;
    focus?: boolean;
  };

const hoverBaseClasses = ({ variant, color }: VariantProp & ColorProp) =>
  cn(
    "disabled:text-m3-on-surface/38 disabled:bg-m3-on-surface/12 disabled:cursor-not-allowed",

    variant === "filled" && "hover:opacity-90",
    variant === "tonal" && "hover:opacity-80",
    variant === "text" && "hover:opacity-80",

    variant === "elevated" &&
      color === "primary" &&
      "hover:bg-m3-primary-container/30",

    variant === "elevated" &&
      color === "secondary" &&
      "hover:bg-m3-secondary-container/30",

    variant === "elevated" &&
      color === "tertiary" &&
      "hover:bg-m3-tertiary-container/30",

    variant === "elevated" &&
      color === "error" &&
      "hover:bg-m3-error-container/30",

    (variant === "outlined" || variant === "plain") &&
      color === "primary" &&
      "hover:bg-m3-primary/15",

    (variant === "outlined" || variant === "plain") &&
      color === "secondary" &&
      "hover:bg-m3-secondary/15",

    (variant === "outlined" || variant === "plain") &&
      color === "tertiary" &&
      "hover:bg-m3-tertiary/15",

    (variant === "outlined" || variant === "plain") &&
      color === "error" &&
      "hover:bg-m3-error/15",
  );

const focusBaseClasses = ({ variant, color }: VariantProp & ColorProp) =>
  cn(
    "disabled:text-m3-on-surface/38 disabled:bg-m3-on-surface/12 disabled:cursor-not-allowed",

    "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-m3-secondary",
    variant === "filled" && "focus-visible:opacity-90",
    variant === "tonal" && "focus-visible:opacity-80",
    variant === "text" && "focus-visible:opacity-80",

    variant === "elevated" &&
      color === "primary" &&
      "focus-visible:bg-m3-primary-container/30",

    variant === "elevated" &&
      color === "secondary" &&
      "focus-visible:bg-m3-secondary-container/30",

    variant === "elevated" &&
      color === "tertiary" &&
      "focus-visible:bg-m3-tertiary-container/30",

    variant === "elevated" &&
      color === "error" &&
      "focus-visible:bg-m3-error-container/30",

    (variant === "outlined" || variant === "plain") &&
      color === "primary" &&
      "focus-visible:bg-m3-primary/15",

    (variant === "outlined" || variant === "plain") &&
      color === "secondary" &&
      "focus-visible:bg-m3-secondary/15",

    (variant === "outlined" || variant === "plain") &&
      color === "tertiary" &&
      "focus-visible:bg-m3-tertiary/15",

    (variant === "outlined" || variant === "plain") &&
      color === "error" &&
      "focus-visible:bg-m3-error/15",
  );

export const baseClasses = ({
  variant,
  color,
  shape,
  underline,
  hover = false,
  focus = false,
}: BaseClassOptions) =>
  cn(
    variant === "elevated" &&
      "bg-m3-surface-container-low shadow shadow-m3-shadow/20",
    variant === "outlined" && "ring-1",
    variant === "plain" && "",
    variant === "text" && "underline-offset-4",

    color === "primary" && "text-m3-primary",
    color === "secondary" && "text-m3-secondary",
    color === "tertiary" && "text-m3-tertiary",
    color === "error" && "text-m3-error",

    shape === "square" && "",
    shape === "rounded" && "rounded-md",
    shape === "circle" && "rounded-full",

    underline === "always" && "underline",
    underline === "hover" && "hover:underline",
    underline === "none" && "",

    variant === "filled" &&
      color === "primary" &&
      "bg-m3-primary text-m3-on-primary",
    variant === "filled" &&
      color === "secondary" &&
      "bg-m3-secondary text-m3-on-secondary",
    variant === "filled" &&
      color === "tertiary" &&
      "bg-m3-tertiary text-m3-on-tertiary",
    variant === "filled" && color === "error" && "bg-m3-error text-m3-on-error",

    variant === "tonal" &&
      color === "primary" &&
      "bg-m3-primary-container text-m3-on-primary-container",
    variant === "tonal" &&
      color === "secondary" &&
      "bg-m3-secondary-container text-m3-on-secondary-container",
    variant === "tonal" &&
      color === "tertiary" &&
      "bg-m3-tertiary-container text-m3-on-tertiary-container",
    variant === "tonal" &&
      color === "error" &&
      "bg-m3-error-container text-m3-on-error-container",

    hover && hoverBaseClasses({ variant, color }),
    focus && focusBaseClasses({ variant, color }),
  );
