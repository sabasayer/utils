import { ExtendArray } from "./extend-array";
import { GroupModel, GroupItem } from "../../data-group/data-group.interface";
new ExtendArray();

describe("extended array functions", () => {
  test("last", () => {
    let items: number[] = [1, 2, 3];
    expect(items.last()).toEqual(3);
  });

  test("pushRange", () => {
    let items: number[] = [1, 2];

    items.pushRange([3, 4]);

    expect(items.length).toEqual(4);
  });

  test("remove", () => {
    let items: number[] = [1, 2, 3, 4, 5];
    items.remove(3);

    expect(items).toEqual([1, 2, 4, 5]);
  });

  test("remove Object", () => {
    let items: { name: string }[] = [{ name: "ali" }, { name: "veli" }];
    let item = items[0];
    items.remove(item);

    expect(items).toEqual([{ name: "veli" }]);
  });

  test("find remove", () => {
    let items: { id: number }[] = [{ id: 12 }, { id: 23 }];

    items.findRemove((e) => e.id == 12);

    expect(items).toEqual([{ id: 23 }]);
  });

  test("pushIf", () => {
    let items: number[] = [1, 3, 4, 5, 6];

    items.pushIf(24, (e) => 24 > 10);
    items.pushIf(8, (e) => 8 > 10);

    expect(items).toEqual([1, 3, 4, 5, 6, 24]);
  });

  test("pushRange", () => {
    let items: number[] = [1, 2];

    items.pushRange([3, 4]);

    expect(items).toEqual([1, 2, 3, 4]);
  });

  test("forEachAsync", async () => {
    let items: number[] = [1, 2];

    let otherItems: number[] = [6, 7];

    const addItemFunction = async (e: number) => {
      return new Promise<void>((resolve) =>
        setTimeout(() => {
          items.push(e);
          resolve();
        }, 300)
      );
    };

    await otherItems.forEachAsync(async (e) => {
      await addItemFunction(e);
    });

    expect(items).toEqual([1, 2, 6, 7]);
  });

  test("toGroupModel", () => {
    let items: { value: string; id: number }[] = [
      { value: "first", id: 1 },
      { value: "second", id: 2 },
      { value: "first", id: 3 },
    ];

    let group = items.toGroupModel((e) => e.value);

    let expectGroup: GroupModel<{ value: string; id: number }> = {
      first: [
        { value: "first", id: 1 },
        { value: "first", id: 3 },
      ],
      second: [{ value: "second", id: 2 }],
    };

    expect(JSON.stringify(group)).toEqual(JSON.stringify(expectGroup));
  });

  test("toGroupItems", () => {
    let items: { value: string; id: number }[] = [
      { value: "first", id: 1 },
      { value: "second", id: 2 },
      { value: "first", id: 3 },
    ];

    let groupItems = items.toGroupItems((e) => e.value);

    let expectGroupItems: GroupItem<{ value: string; id: number }>[] = [
      {
        key: "first",
        values: [
          { value: "first", id: 1 },
          { value: "first", id: 3 },
        ],
      },
      {
        key: "second",
        values: [
          {
            value: "second",
            id: 2,
          },
        ],
      },
    ];

    expect(JSON.stringify(groupItems)).toEqual(
      JSON.stringify(expectGroupItems)
    );
  });

  test("toGroupModelValues", () => {
    let items: { value: string; id: number }[] = [
      { value: "first", id: 1 },
      { value: "second", id: 2 },
      { value: "first", id: 3 },
    ];

    let groupValues = items.toGroupModelValues((e) => e.value);

    let expectGroupValues: { value: string; id: number }[][] = [
      [
        { value: "first", id: 1 },

        { value: "first", id: 3 },
      ],
      [{ value: "second", id: 2 }],
    ];

    expect(JSON.stringify(groupValues)).toEqual(
      JSON.stringify(expectGroupValues)
    );
  });

  test("sum", () => {
    let items: { value: number }[] = [{ value: 1 }, { value: 2 }, { value: 3 }];

    let sum = items.sum((e) => e.value);

    expect(sum).toEqual(6);
  });

  test("distinc", () => {
    let items: string[] = ["ali", "veli", "ayşe", "veli", "ali"];
    items = items.distinct();

    expect(items.length).toEqual(3);
  });
});
