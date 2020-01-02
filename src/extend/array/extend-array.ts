import { DataGroupUtils } from "../../data-group/data-group.util";
import { GroupItem, GroupModel } from "../../data-group/data-group.interface";

declare global {
    interface Array<T> {
        remove(o: T): number;
        last(): T;
        findRemove(
            findFunction?: (item: T, index?: number, obj?: Array<T>) => boolean
        ): void;
        pushIf(item: T, statement?: (arr: Array<T>) => boolean): void;
        pushRange(items: Array<T>, statement?: (item: T) => boolean): void;
        forEachAsync(
            callback: (item: T, index: number, array: T[]) => void
        ): Promise<void>;
        toGroupModel(groupBy: (item: T) => any): GroupModel<T>;
        toGroupModelValues(groupBy: (item: T) => any): T[][];
        sum(statement: (item: T) => number): number;
        toGroupItems<ChildType = T>(
            groupBy: (item: T) => any,
            itemChildProp?: (item: T) => any,
            childGroupBy?: (item: ChildType) => any
        ): GroupItem<T, ChildType>[];
        distinct(): Array<T>;
    }
}
export class ExtendArray {
    constructor() {
        this.remove();
        this.last();
        this.findRemove();
        this.sum();
        this.pushIf();
        this.pushRange();
        this.forEachAsync();
        this.toGroupModel();
        this.toGroupModelValues();
        this.toGroupItems();
        this.distinct();
    }
    last() {
        if (!!Array.prototype.last) return;

        Object.defineProperty(Array.prototype, "last", {
            value: function<T>(this: T[]): T | undefined {
                if (this.length > 0) return this[this.length - 1];
            },
            enumerable: false,
            configurable: true
        });
    }
    remove() {
        if (!!Array.prototype.remove) return;

        Object.defineProperty(Array.prototype, "remove", {
            value: function<T>(this: T[], elem: T): number {
                let index = this.indexOf(elem);
                if (index > -1) {
                    this.splice(index, 1);
                }
                return index;
            },
            enumerable: false,
            configurable: true
        });
    }
    findRemove() {
        if (!!Array.prototype.findRemove) return;

        Object.defineProperty(Array.prototype, "findRemove", {
            value: function<T>(
                this: T[],
                findFunction?: (
                    item: T,
                    index?: number,
                    obj?: Array<T>
                ) => boolean
            ): void {
                if (findFunction) {
                    let foundItems = this.filter(findFunction);
                    if (foundItems.length > 0) {
                        foundItems.forEach(item => {
                            this.remove(item);
                        });
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
    }
    pushIf() {
        if (!!Array.prototype.pushIf) return;

        Object.defineProperty(Array.prototype, "pushIf", {
            value: function<T>(item: T, statement: (item: T) => boolean) {
                if (statement(this)) {
                    this.push(item);
                }
            },
            enumerable: false,
            configurable: true
        });
    }
    pushRange() {
        if (!!Array.prototype.pushRange) return;

        Object.defineProperty(Array.prototype, "pushRange", {
            value: function<T>(
                this: T[],
                items: T[],
                statement?: (item: T) => boolean
            ): void {
                for (let i = 0, len = items.length; i < len; i++) {
                    if (!statement || statement(items[i])) this.push(items[i]);
                }
            },
            enumerable: false,
            configurable: true
        });
    }

    forEachAsync() {
        if (!!Array.prototype.forEachAsync) return;

        Object.defineProperty(Array.prototype, "forEachAsync", {
            value: async function<T>(
                this: T[],
                callback: (item: T, index: number, array: T[]) => void
            ) {
                for (let index = 0; index < this.length; index++) {
                    await callback(this[index], index, this);
                }
            },
            enumerable: false,
            configurable: true
        });
    }
    toGroupModel() {
        if (!!Array.prototype.toGroupModel) return;

        Object.defineProperty(Array.prototype, "toGroupModel", {
            value: function<T>(this: T[], groupBy: (item: T) => any) {
                return DataGroupUtils.toGroupModel(this, groupBy);
            },
            enumerable: false,
            configurable: true
        });
    }
    toGroupItems() {
        if (!!Array.prototype.toGroupItems) return;

        Object.defineProperty(Array.prototype, "toGroupItems", {
            value: function<T, ChildType = T>(
                this: T[],
                groupBy: (item: T) => any,
                itemChildProp?: (item: T) => any,
                childGroupBy?: (item: ChildType) => any
            ) {
                return DataGroupUtils.toGroupItems(
                    this,
                    groupBy,
                    itemChildProp,
                    childGroupBy
                );
            },
            enumerable: false,
            configurable: true
        });
    }
    toGroupModelValues() {
        if (!!Array.prototype.toGroupModelValues) return;

        Object.defineProperty(Array.prototype, "toGroupModelValues", {
            value: function<T>(this: T[], groupBy: (item: T) => any) {
                return Object.values(this.toGroupModel(groupBy));
            },
            enumerable: false,
            configurable: true
        });
    }
    sum() {
        if (!!Array.prototype.sum) return;

        Object.defineProperty(Array.prototype, "sum", {
            value: function<T>(statement: (item: T) => number) {
                let total = 0;
                for (let i = 0, _len = this.length; i < _len; i++) {
                    total += statement(this[i]);
                }
                return total;
            },
            enumerable: false,
            configurable: true
        });
    }
    distinct() {
        if (!!Array.prototype.distinct) return;

        Object.defineProperty(Array.prototype, "distinct", {
            value: function<T>() {
                return (this as Array<T>).filter((e: T, index: number, arr: Array<T>) => {
                    return arr.indexOf(e) === index;
                });
            },
            enumerable: false,
            configurable: true
        });
    }
}
