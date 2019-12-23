import {ExtendArray} from './extend-array';
new ExtendArray();

describe("extended array functions",()=>{
    test("pushRange",()=>{
        let items:number[] = [1,2];

        items.pushRange([3,4]);

        expect(items.length).toEqual(4);
    })

    test("last",()=>{
        let items:number[] = [1,2,3];
        expect(items.last).toEqual(3);
    })
})