import { dataGroupUtil } from "../../data-group/data-group.util";
import { GroupItem, GroupModel } from "../../data-group/data-group.interface";
import { getPropValue, GetPropValueType } from "../../object-helper/object.helper";

declare global {
  interface Array<T> {
    remove(o: T): number;
    last(): T;
    findRemove(findFunction?: (item: T, index?: number, obj?: Array<T>) => boolean): void;
    pushIf(item: T, statement?: (arr: Array<T>) => boolean): void;
    pushRange(items: Array<T>, statement?: (item: T) => boolean): void;
    forEachAsync(callback: (item: T, index: number, array: T[]) => void): Promise<void>;
    toGroupModel(groupBy: (item: T) => any): GroupModel<T>;
    toGroupModelValues(groupBy: (item: T) => any): T[][];
    sum(statement: (item: T) => number): number;
    toGroupItems<ChildType = T>(
      groupBy: (item: T) => any,
      itemChildProp?: (item: T) => any,
      childGroupBy?: (item: ChildType) => any
    ): GroupItem<T, ChildType>[];
    distinct(getProp?: GetPropValueType<T>): Array<T>;
    mapIf<T2>(map: (item: T) => T2, condition: (item: T) => boolean): Array<T2>;
    filterByCollection<T2>(getProp: (item: T) => T2, collection: T2[]): T[];
    filterByExcludesCollection<T2>(getProp: (item: T) => T2, collection: T2[]): T[];
    findByCollection<T2>(getProp: (item: T) => T2, collection: T2[]): T;
  }
}

const defineNewMethod = (name: string, newMethod: Function) => {
  Object.defineProperty(Array.prototype, name, {
    value: newMethod,
    enumerable: false,
    configurable: true,
  });
};

const last = () => {
  if (!!Array.prototype.last) return;

  defineNewMethod("last", function <T>(this: T[]): T | undefined {
    if (this.length > 0) return this[this.length - 1];
  });
};

const remove = () => {
  if (!!Array.prototype.remove) return;

  defineNewMethod("remove", function <T>(this: T[], elem: T): number {
    let index = this.indexOf(elem);
    if (index > -1) {
      this.splice(index, 1);
    }
    return index;
  });
};

const findRemove = () => {
  if (!!Array.prototype.findRemove) return;

  defineNewMethod("findRemove", function <
    T
  >(this: T[], findFunction?: (item: T, index?: number, obj?: Array<T>) => boolean): void {
    if (findFunction) {
      let foundItems = this.filter(findFunction);
      if (foundItems.length > 0) {
        foundItems.forEach((item) => {
          this.remove(item);
        });
      }
    }
  });
};

const pushIf = () => {
  if (!!Array.prototype.pushIf) return;

  defineNewMethod("pushIf", function <T>(this: T[], item: T, statement: (item: T[]) => boolean) {
    if (statement(this)) {
      this.push(item);
    }
  });
};

const pushRange = () => {
  if (!!Array.prototype.pushRange) return;

  defineNewMethod("pushRange", function <T>(this: T[], items: T[], statement?: (item: T) => boolean): void {
    for (let i = 0, len = items.length; i < len; i++) {
      if (!statement || statement(items[i])) this.push(items[i]);
    }
  });
};

const forEachAsync = () => {
  if (!!Array.prototype.forEachAsync) return;

  defineNewMethod("forEachAsync", async function <
    T
  >(this: T[], callback: (item: T, index: number, array: T[]) => void) {
    for (let index = 0; index < this.length; index++) {
      await callback(this[index], index, this);
    }
  });
};

const toGroupModel = () => {
  if (!!Array.prototype.toGroupModel) return;

  defineNewMethod("toGroupModel", function <T>(this: T[], groupBy: (item: T) => any) {
    return dataGroupUtil.toGroupModel(this, groupBy);
  });
};

const toGroupItems = () => {
  if (!!Array.prototype.toGroupItems) return;

  defineNewMethod("toGroupItems", function <
    T,
    ChildType = T
  >(this: T[], groupBy: (item: T) => any, itemChildProp?: (item: T) => any, childGroupBy?: (item: ChildType) => any) {
    return dataGroupUtil.toGroupItems(this, groupBy, itemChildProp, childGroupBy);
  });
};

const toGroupModelValues = () => {
  if (!!Array.prototype.toGroupModelValues) return;

  defineNewMethod("toGroupModelValues", function <T>(this: T[], groupBy: (item: T) => any) {
    return Object.values(this.toGroupModel(groupBy));
  });
};

const sum = () => {
  if (!!Array.prototype.sum) return;

  defineNewMethod("sum", function <T>(this: T[], statement: (item: T) => number) {
    let total = 0;
    for (let i = 0, _len = this.length; i < _len; i++) {
      total += statement(this[i]);
    }
    return total;
  });
};

const distinct = () => {
  if (!!Array.prototype.distinct) return;

  defineNewMethod("distinct", function <T>(this: T[], getProp?: GetPropValueType<T>) {
    return this.filter((e: T, index: number, arr: Array<T>) => {
      if (getProp) {
        const value = getPropValue(e, getProp);

        return arr.findIndex((item) => getPropValue(item, getProp) === value) === index;
      }
      return arr.indexOf(e) === index;
    });
  });
};

const mapIf = () => {
  if (!!Array.prototype.mapIf) return;

  defineNewMethod("mapIf", function <T, T2>(this: T[], map: (item: T) => T2, condition: (item: T) => boolean) {
    let res: T2[] = [];
    for (const item of this) {
      if (condition(item)) res.push(map(item));
    }

    return res;
  });
};

const filterByCollection = () => {
  if (!!Array.prototype.filterByCollection) return;

  defineNewMethod("filterByCollection", function <T, T2>(this: T[], getProp: (item: T) => T2, collection: T2[]) {
    return this.filter((e) => collection.includes(getProp(e)));
  });
};

const filterByExcludesCollection = () => {
  if (!!Array.prototype.filterByExcludesCollection) return;

  defineNewMethod("filterByExcludesCollection", function <
    T,
    T2
  >(this: T[], getProp: (item: T) => T2, collection: T2[]) {
    return this.filter((e) => !collection.includes(getProp(e)));
  });
};

const findByCollection = () => {
  if (!!Array.prototype.findByCollection) return;

  defineNewMethod("findByCollection", function <T, T2>(this: T[], getProp: (item: T) => T2, collection: T2[]) {
    return this.find((e) => collection.includes(getProp(e)));
  });
};

export const extendArray = () => {
  remove();
  last();
  findRemove();
  sum();
  pushIf();
  pushRange();
  forEachAsync();
  toGroupModel();
  toGroupModelValues();
  toGroupItems();
  distinct();
  mapIf();
  filterByCollection();
  filterByExcludesCollection();
  findByCollection();
};
