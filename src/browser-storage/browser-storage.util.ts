export abstract class BrowserStorageUtil {
    protected static storage = window.sessionStorage;
    private static inMemoryStorage: { [key: string]: string } = {};

    protected abstract setStorage(storageType:Storage):void;

    private static isSupported() {
        try {
            const key = "__some_random_key_you_are_not_going_to_use__";
            this.storage.setItem(key, key);
            this.storage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    }

    static clear() {
        if (this.isSupported()) {
            this.storage.clear();
        } else {
            this.inMemoryStorage = {};
        }
    }

    static getItem(name: string): string | null {
        if (this.isSupported()) {
            return this.storage.getItem(name);
        }
        if (this.inMemoryStorage.hasOwnProperty(name)) {
            return this.inMemoryStorage[name];
        }
        return null;
    }

    static key(index: number): string | null {
        if (this.isSupported()) {
            return this.storage.key(index);
        } else {
            return Object.keys(this.inMemoryStorage)[index] || null;
        }
    }

    static removeItem(name: string) {
        if (this.isSupported()) {
            this.storage.removeItem(name);
        } else {
            delete this.inMemoryStorage[name];
        }
    }

    static setItem(name: string, value: string): void {
        if (this.isSupported()) {
            this.storage.setItem(name, value);
        } else {
            this.inMemoryStorage[name] = value;
        }
    }
}

export abstract class SessionStorageUtil extends BrowserStorageUtil {
    protected static storage = window.sessionStorage;
}

export abstract class LocalStorageUtil extends BrowserStorageUtil {
    protected static storage = window.localStorage;
}
