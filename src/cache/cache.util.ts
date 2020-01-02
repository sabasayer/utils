import { LocalStorageFactory, SessionStorageFactory } from "../browser-storage/browser-storage";
import { EnumCacheType } from "./cache-type.enum";

export abstract class CacheUtil {
    private static data: { [key: string]: any } = {};

    private static addToMemory = (key: string, data: any) =>
        (CacheUtil.data[key] = data);

    private static getFromMemory = (key: string) => CacheUtil.data[key];

    private static addToLocalStorage = (key: string, data: any) =>
        LocalStorageFactory.setItem(key, JSON.stringify(data));

    private static getFromLocalStorage = (key: string) => {
        let data = LocalStorageFactory.getItem(key);
        if (data) return JSON.parse(data);
        return null;
    };

    private static addToSessionStorage = (key: string, data: any) =>
        SessionStorageFactory.setItem(key, JSON.stringify(data));

    private static getFromSessionStorage = (key: string) => {
        let data = SessionStorageFactory.getItem(key);
        if (data) return JSON.parse(data);
        return null;
    };

    static addToCache(type: EnumCacheType, key: string, data: any) {
        if (data == undefined) return;
        switch (type) {
            case EnumCacheType.Memory:
                CacheUtil.addToMemory(key, data);
                break;
            case EnumCacheType.SessionStorage:
                CacheUtil.addToSessionStorage(key, data);
                break;
            case EnumCacheType.LocalStorage:
                CacheUtil.addToLocalStorage(key, data);
                break;
            case EnumCacheType.IndexedDB:
                //TODO: indexedDb set
                break;
        }
    }

    static getFromCache(type: EnumCacheType, key: string) {
        switch (type) {
            case EnumCacheType.Memory:
                return CacheUtil.getFromMemory(key);
            case EnumCacheType.SessionStorage:
                return CacheUtil.getFromSessionStorage(key);
            case EnumCacheType.LocalStorage:
                return CacheUtil.getFromLocalStorage(key);
            case EnumCacheType.IndexedDB:
                //TODO: indexedDb get
                break;
        }
    }

    static cache(type: EnumCacheType):MethodDecorator {
        return function(
            target: any,
            propertyKey: string | symbol,
            descriptor: PropertyDescriptor
        ) {
            const originalMethod = descriptor.value;

            descriptor.value = async function(...args: any[]) {
                let key = args.reduce((key: string, item: any) => {
                    key += "_" + JSON.stringify(item);
                    return key;
                }, "");

                key = target.name + "_" + propertyKey.toString() + "_" + key;

                let data = CacheUtil.getFromCache(type, key);
                if (data) return data;

                let res = await originalMethod.apply(this, args);
                CacheUtil.addToCache(type, key, res);
                return res;
            };

            return descriptor;
        };
    }
}
