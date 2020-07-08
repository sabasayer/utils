import { SortUtil } from './sort.util';

describe("Sort Util", () => {
    it("should compare two dates", () => {
        const date1 = { date: "2020-01-01T:00:00:0000" };
        const date2 = { date: "2020-02-01T:00:00:0000" };

        const result = SortUtil.compareFn(date1, date2, e => e.date);
        const resultReverse = SortUtil.compareFn(date2, date1, e => e.date);
        const resultDesc = SortUtil.compareFn(date1, date2, e => e.date, true);

        const resultSame = SortUtil.compareFn(date2, date2, e => e.date);

        expect(result).toBe(-1);
        expect(resultReverse).toBe(1);
        expect(resultDesc).toBe(1);
        expect(resultSame).toBe(0);
    })

    it("should sort by date", () => {
        let items = [
            { date: "2020-01-01T:00:00:0000" },
            { date: "2020-02-01T:00:00:0000" }
        ]

        items.sort((a, b) => SortUtil.compareFn(a, b, e => e.date));

        expect(items[0].date).toBe('2020-01-01T:00:00:0000')
    })

    it("should sort by date desc", () => {
        let items = [
            { date: "2020-01-01T:00:00:0000" },
            { date: "2020-02-01T:00:00:0000" }
        ]

        items.sort((a, b) => SortUtil.compareFn(a, b, e => e.date,true));

        expect(items[0].date).toBe('2020-02-01T:00:00:0000')
    })
})