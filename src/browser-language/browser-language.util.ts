export abstract class BrowserLanguageUtil{
    static getBrowserLang() {
        let locale = "";
        if (navigator.languages != undefined) {
            locale = navigator.languages[0];
        } else {
            locale = navigator.language;
        }
        locale = locale.toLowerCase();
        return locale;
    }
}