import { EventManager } from "./event-manager";

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

export * from "./alert";
export * from "./autocomplete";
export * from "./avatar";
export * from "./badge";
export * from "./box";
export * from "./breadcrumbs";
export * from "./button";
export * from "./chip";
export * from "./command";
export * from "./common";
export * from "./dialog";
export * from "./fab";
export * from "./input";
export * from "./link";
export * from "./markdown";
export * from "./menu";
export * from "./modal";
export * from "./popover";
export * from "./portal";
export * from "./progress";
export * from "./shortcut";
export * from "./skeleton";
export * from "./textarea";
export * from "./toggle";
export * from "./tooltip";

export * from "./base";
export * from "./merge-props";
export * from "./utils";
