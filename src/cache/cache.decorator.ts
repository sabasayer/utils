import { EnumCacheType } from "./cache-type.enum";
import { CacheUtil } from "./cache.util";

export function cache(type: EnumCacheType): MethodDecorator {
    return CacheUtil.cache(type);
}

export function cacheToMemory(): MethodDecorator {
    return CacheUtil.cache(EnumCacheType.Memory);
}

export function cacheToLocalStorage(): MethodDecorator {
    return CacheUtil.cache(EnumCacheType.LocalStorage);
}

export function cacheToSessionStorage(): MethodDecorator {
    return CacheUtil.cache(EnumCacheType.SessionStorage);
}

export function cacheToIndexedDB(): MethodDecorator {
    return CacheUtil.cache(EnumCacheType.IndexedDB);
}
