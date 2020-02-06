import cloneDeep from 'lodash.clonedeep';

export abstract class DataTrackerUtil {
    static dataStore: {
        [key: number]: any;
    } = {};

    static registerData(uid:number,data:any)
    {
        this.dataStore[uid] = cloneDeep(data);
    }

    static isDataChanged(uid:number,data:any){
        let oldData = this.dataStore[uid];

        if(!oldData)
            throw "bu veri kayıt edilmemiş";

        return JSON.stringify(oldData) != JSON.stringify(cloneDeep(data));
    }
}
