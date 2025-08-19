import { EventManager } from "./event-manager.js";

/**
 * A global event manager. Register event listeners with the `on` method.
 * Listeners will execute in LIFO order. Any listener that calls
 * `stopImmediatePropagation()` will cause the event manager to stop processing
 * subsequent listeners.
 *
 * @example
 *   events.on("keydown", (event) => {
 *     console.log("keydown event:", event);
 *   });
 */
export const events = new EventManager();

export * from "./alert/index.js";
export * from "./autocomplete/index.js";
export * from "./avatar/index.js";
export * from "./badge/index.js";
export * from "./box/index.js";
export * from "./breadcrumbs/index.js";
export * from "./button/index.js";
export * from "./chip/index.js";
export * from "./command/index.js";
export * from "./common/index.js";
export * from "./dialog/index.js";
export * from "./fab/index.js";
export * from "./input/index.js";
export * from "./link/index.js";
export * from "./markdown/index.js";
export * from "./menu/index.js";
export * from "./modal/index.js";
export * from "./popover/index.js";
export * from "./portal/index.js";
export * from "./progress/index.js";
export * from "./shortcut/index.js";
export * from "./skeleton/index.js";
export * from "./slider/index.js";
export * from "./switch/index.js";
export * from "./textarea/index.js";
export * from "./toggle/index.js";
export * from "./tooltip/index.js";

export * from "./base.js";
export * from "./merge-props.js";
export * from "./stores.svelte";
export * from "./utils.js";
