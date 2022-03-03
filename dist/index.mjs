import {
  __spreadProps,
  __spreadValues
} from "./chunk-SOEV5HRE.mjs";

// src/index.ts
import { createRequire } from "module";
import { createSyncFn } from "synckit";
function getThemeName(theme) {
  if (typeof theme === "string")
    return theme;
  return theme.name;
}
function resolveOptions(options) {
  const themes = [];
  let darkModeThemes;
  if (!options.theme) {
    themes.push("nord");
  } else if (typeof options.theme === "string") {
    themes.push(options.theme);
  } else {
    if ("dark" in options.theme || "light" in options.theme) {
      darkModeThemes = options.theme;
      themes.push(options.theme.dark);
      themes.push(options.theme.light);
    } else {
      themes.push(options.theme);
    }
  }
  return __spreadProps(__spreadValues({}, options), {
    themes,
    darkModeThemes: darkModeThemes ? {
      dark: getThemeName(darkModeThemes.dark),
      light: getThemeName(darkModeThemes.light)
    } : void 0
  });
}
var require2 = createRequire(import.meta.url);
var syncRun = createSyncFn(require2.resolve("./worker"));
var MarkdownItShiki = (markdownit, options = {}) => {
  const _highlighter = options.highlighter;
  const {
    langs,
    themes,
    darkModeThemes
  } = resolveOptions(options);
  if (!_highlighter)
    syncRun("getHighlighter", { langs, themes });
  const highlightCode = (code, lang, theme) => {
    if (_highlighter) {
      return _highlighter.codeToHtml(code, lang || "text", theme);
    }
    return syncRun("codeToHtml", {
      code,
      theme,
      lang: lang || "text"
    });
  };
  markdownit.options.highlight = (code, lang) => {
    if (darkModeThemes) {
      const dark = highlightCode(code, lang, darkModeThemes.dark).replace('<pre class="shiki"', '<pre class="shiki shiki-dark"');
      const light = highlightCode(code, lang || "text", darkModeThemes.light).replace('<pre class="shiki"', '<pre class="shiki shiki-light"');
      return `<div class="shiki-container">${dark}${light}</div>`;
    } else {
      return highlightCode(code, lang || "text");
    }
  };
};
var src_default = MarkdownItShiki;
export {
  src_default as default,
  resolveOptions
};
