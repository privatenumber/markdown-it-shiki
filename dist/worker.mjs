import "./chunk-SOEV5HRE.mjs";

// src/worker.ts
import { getHighlighter } from "shiki";
import { runAsWorker } from "synckit";
var h;
async function handler(command, options) {
  if (command === "getHighlighter") {
    h = await getHighlighter(options);
  } else if (command === "codeToHtml") {
    const { code, lang, theme } = options;
    return h.codeToHtml(code, lang, theme);
  }
}
runAsWorker(handler);
