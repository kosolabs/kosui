import { Lexer, type MarkedToken, type Token } from "marked";

const SCHEME = /^[a-z][a-z\d+.-]*:/i;
const SAFE_SCHEME = /^(?:https?|mailto|tel):/i;

function isSafe(url: string): boolean {
  const normalized = url.replace(/[\p{Cc}\s]/gu, "");
  return !SCHEME.test(normalized) || SAFE_SCHEME.test(normalized);
}

function sanitize(tokens: Token[]) {
  for (const token of tokens as MarkedToken[]) {
    if (token.type === "link" || token.type === "image") {
      token.href = isSafe(token.href) ? token.href : "";
    }
    if ("tokens" in token && token.tokens) {
      sanitize(token.tokens);
    }
    if (token.type === "list") {
      sanitize(token.items);
    }
    if (token.type === "table") {
      for (const cell of [...token.header, ...token.rows.flat()]) {
        sanitize(cell.tokens);
      }
    }
  }
}

export function parse(
  value: string,
  options: { gfm: boolean; breaks: boolean },
): MarkedToken[] {
  const tokens = new Lexer(options).lex(value);
  sanitize(tokens);
  return tokens as MarkedToken[];
}
