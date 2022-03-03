import { IThemeRegistration, ILanguageRegistration, Highlighter } from 'shiki';
import MarkdownIt from 'markdown-it';

interface DarkModeThemes {
    dark: IThemeRegistration;
    light: IThemeRegistration;
}
interface Options {
    theme?: IThemeRegistration | DarkModeThemes;
    langs?: ILanguageRegistration[];
    timeout?: number;
    highlighter?: Highlighter;
}
declare function resolveOptions(options: Options): {
    themes: IThemeRegistration[];
    darkModeThemes: {
        dark: string;
        light: string;
    } | undefined;
    theme?: DarkModeThemes | IThemeRegistration | undefined;
    langs?: ILanguageRegistration[] | undefined;
    timeout?: number | undefined;
    highlighter?: Highlighter | undefined;
};
declare const MarkdownItShiki: MarkdownIt.PluginWithOptions<Options>;

export { DarkModeThemes, Options, MarkdownItShiki as default, resolveOptions };
