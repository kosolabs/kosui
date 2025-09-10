<script lang="ts">
  import hljs from "highlight.js";
  import svelte from "highlight.svelte";
  hljs.registerLanguage("svelte", svelte);

  export type CodeProps<
    T extends Record<string, unknown> = Record<string, unknown>,
  > = {
    component: string;
    bindables?: (keyof T)[];
    defaults: T;
    values: Partial<T>;
  };
  let { component, bindables = [], defaults, values }: CodeProps = $props();

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

    const script = [`import { ${component} } from "kosui";`];
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
      `<${component}${joinProps(props)}/>`,
    ].join("\n");
  });
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<pre>{@html hljs.highlight(code, { language: "svelte" }).value}</pre>
