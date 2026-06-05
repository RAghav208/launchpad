import { Fragment, type ReactNode } from "react";

const KEYWORDS = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await", "break",
  "class", "continue", "def", "del", "elif", "else", "except", "finally", "for",
  "from", "global", "if", "import", "in", "is", "lambda", "nonlocal", "not", "or",
  "pass", "raise", "return", "try", "while", "with", "yield",
]);

const BUILTINS = new Set([
  "print", "len", "range", "int", "str", "float", "list", "dict", "set", "tuple",
  "bool", "input", "sum", "min", "max", "abs", "sorted", "enumerate", "zip", "map",
  "filter", "type", "isinstance", "open", "round", "reversed", "any", "all",
]);

// Order matters: comment | string | number | identifier | (whitespace/punctuation)
const TOKEN_RE =
  /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\d+\.?\d*)|([A-Za-z_]\w*)|(\s+|[^\sA-Za-z0-9_]+)/g;

/** Lightweight, dependency-free Python highlighter → React nodes. */
export function highlightPython(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let key = 0;
  let match: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(code)) !== null) {
    const [full, comment, str, num, ident] = match;
    if (comment) {
      out.push(
        <span key={key++} className="text-code-com italic">
          {comment}
        </span>,
      );
    } else if (str) {
      out.push(
        <span key={key++} className="text-code-str">
          {str}
        </span>,
      );
    } else if (num) {
      out.push(
        <span key={key++} className="text-code-num">
          {num}
        </span>,
      );
    } else if (ident) {
      if (KEYWORDS.has(ident)) {
        out.push(
          <span key={key++} className="text-code-kw">
            {ident}
          </span>,
        );
      } else if (BUILTINS.has(ident)) {
        out.push(
          <span key={key++} className="text-code-fn">
            {ident}
          </span>,
        );
      } else {
        out.push(<Fragment key={key++}>{ident}</Fragment>);
      }
    } else {
      out.push(<Fragment key={key++}>{full}</Fragment>);
    }
  }

  return out;
}
