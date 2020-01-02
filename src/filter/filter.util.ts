import { DateUtil } from "../date/date.util";
import { BrowserLanguageUtil } from "../browser-language/browser-language.util";

export abstract class FilterUtil {
  static compareFn<T>(
    item: T,
    getProp: (item: T) => any,
    term: string
  ): boolean {
    let prop = getProp(item);
    if (!prop) false;

    term = term.trim().toLocaleLowerCase(BrowserLanguageUtil.getBrowserLang());

    if (typeof prop === "string") {
      if (DateUtil.checkApiStringValidity(prop)) {
        let date = new Date(prop);
        date.setHours(0, 0, 0, 0);
        let dateString = DateUtil.dateToApiDate(date);
        term = term.toLowerCase();
        return dateString == term;
      }

      return (
        prop
          .toLocaleLowerCase(BrowserLanguageUtil.getBrowserLang())
          .indexOf(term) > -1
      );
    }

    return prop == term;
  }

  static filter<T>(items: T[], getProp: (item: T) => any, term: string): T[] {
    return items.filter(e => FilterUtil.compareFn(e, getProp, term));
  }
}
