export abstract class DecimalUtil {
    static toFixedNumber(value: number, precision?: number) {
        if (value == undefined || isNaN(value)) return 0;
        let str = value.toFixed(precision ?? 2);
        return parseFloat(str);
    }
}