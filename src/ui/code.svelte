<script lang="ts">
  import CodeBlock from "./code-block.svelte";

  export type CodeProps<
    T extends Record<string, unknown> = Record<string, unknown>,
  > = {
    component: string;
    bindables?: (keyof T)[];
    defaults: T;
    values: Partial<T>;
    expressions?: Record<string, string | undefined>;
    imports?: string[];
    children?: string;
  };
  let {
    component,
    bindables = [],
    defaults,
    values,
    expressions = {},
    imports = [],
    children,
  }: CodeProps = $props();

  function eq(objA: unknown, objB: unknown): boolean {
    return JSON.stringify(objA) === JSON.stringify(objB);
  }

  function joinProps(props: string[]): string {
    if (
      props.some((prop) => prop.includes("\n")) ||
      props.join(" ").length > 50
    ) {
      return `\n  ${props.join("\n  ")}\n`;
    }
    if (props.length > 0) {
      return ` ${props.join(" ")} `;
    }
    return " ";
  }

  const code = $derived.by(() => {
    const props = [];

    for (const bindable of bindables) {
      props.push(`bind:${bindable}`);
    }

    for (const [key, value] of Object.entries(values)) {
      if (
        !bindables.includes(key) &&
        value !== undefined &&
        !eq(value, defaults[key])
      ) {
        if (typeof defaults[key] === "boolean" && value === true) {
          props.push(key);
        } else if (typeof defaults[key] === "string") {
          props.push(`${key}="${value}"`);
        } else {
          props.push(
            `${key}={${JSON.stringify(value, null, 2).replaceAll("\n", "\n  ")}}`,
          );
        }
      }
    }

    for (const [key, expression] of Object.entries(expressions)) {
      if (expression !== undefined) {
        props.push(`${key}={${expression}}`);
      }
    }

    const script = [`import { ${component} } from "kosui";`, ...imports];
    if (bindables.length > 0) {
      script.push(``);
    }
    for (const bindable of bindables) {
      script.push(
        `let ${bindable}: ${typeof defaults[bindable]} = $state(${defaults[bindable]})`,
      );
    }

    return [
      `<${"script"} lang="ts">`,
      ...script.map((line) => `  ${line}`),
      `</${"script"}>`,
      ``,
      element(joinProps(props)),
    ].join("\n");
  });

  function element(props: string): string {
    if (children === undefined) {
      return `<${component}${props}/>`;
    }
    if (props.includes("\n") || children.includes("\n")) {
      return `<${component}${props.trimEnd()}>\n  ${children}\n</${component}>`;
    }
    return `<${component}${props.trimEnd()}>${children}</${component}>`;
  }
</script>

<CodeBlock {code} />
