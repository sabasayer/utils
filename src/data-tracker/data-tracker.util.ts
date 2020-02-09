import cloneDeep from "lodash.clonedeep";
import { UuidUtil } from "../uuid/uuid.util";

export abstract class DataTrackerUtil {
    static dataStore: {
        [key: string]: any;
    } = {};

    static registerData(data: any, id?: string) {
        let uuid = id ?? UuidUtil.uuidv4();
        this.dataStore[uuid] = cloneDeep(data);
        return uuid;
    }

    static isDataChanged(uid: string, data: any) {
        let oldData = this.dataStore[uid];

        if (!oldData) throw "this data is not registered";

        return JSON.stringify(oldData) != JSON.stringify(cloneDeep(data));
    }
}
