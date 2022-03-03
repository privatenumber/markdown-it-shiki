var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/index.ts
__export(exports, {
  default: () => src_default,
  resolveOptions: () => resolveOptions
});

// node_modules/.pnpm/tsup@5.7.0_typescript@4.4.4/node_modules/tsup/assets/cjs_shims.js
var importMetaUrlShim = typeof document === "undefined" ? new (require("url")).URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;

// src/index.ts
var import_module = __toModule(require("module"));
var import_synckit = __toModule(require("synckit"));
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
var require2 = (0, import_module.createRequire)(importMetaUrlShim);
var syncRun = (0, import_synckit.createSyncFn)(require2.resolve("./worker"));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resolveOptions
});
