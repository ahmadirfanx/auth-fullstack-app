import { SWITCH_LANGUAGE } from "./Types";
import { SWITCH_THEME } from "./Types";

export const switchLanguage = (_lang: string) => {
    return {
        type: SWITCH_LANGUAGE,
        language: _lang
    }
}

export const switchTheme = (_theme: string) => {
    return {
        type: SWITCH_THEME,
        theme: _theme
    }
}
