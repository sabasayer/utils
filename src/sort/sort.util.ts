import cloneDeep from "lodash.clonedeep";
import { DateUtil } from "../date/date.util";
import { BrowserLanguageUtil } from "../browser-language/browser-language.util";

export abstract class SortUtil {
  static readonly undefinedSortValue: string = "-999999999";

  static compareFn<T>(
    prevValue: T,
    value: T,
    getProp: (item: T) => any,
    desc: boolean = false
  ) {
    let prevClone = cloneDeep(prevValue);
    let valueClone = cloneDeep(value);

    let x = getProp(prevClone) ?? SortUtil.undefinedSortValue;
    let y = getProp(valueClone) ?? SortUtil.undefinedSortValue;

    if (typeof x === "string" && typeof y === "string") {
      let xDateValue = new Date(x);
      let yDateValue = new Date(y);
      if (
        DateUtil.checkDateValidity(xDateValue) &&
        DateUtil.checkDateValidity(yDateValue)
      ) {
        return this.sortNumberOrDate(xDateValue, yDateValue, desc);
      }

      x = x.toLocaleLowerCase(BrowserLanguageUtil.getBrowserLang());
      y = y.toLocaleLowerCase(BrowserLanguageUtil.getBrowserLang());
      
      let compareRes = (x as string).localeCompare(y,BrowserLanguageUtil.getBrowserLang());
      return desc ? compareRes * -1 : compareRes;
    }

    if (Number(x) && Number(y)) {
      return this.sortNumberOrDate(x, y, desc);
    }

    if (desc) {
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
    } else {
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
    }

    return 0;
  }

  static sortNumberOrDate(x: number | Date, y: number | Date, desc: boolean) {
    if (desc) {
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
    } else {
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
    }

    return 0;
  }
}
