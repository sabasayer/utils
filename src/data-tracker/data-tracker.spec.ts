import { DataTrackerUtil } from "./data-tracker.util";

describe("data tracker tests", () => {
  test("primative data change", () => {
    let data: string = "test";
    DataTrackerUtil.registerData(1, data);
    data = "test2";
    expect(DataTrackerUtil.isDataChanged(1, data)).toBeTruthy();
  });

  test("primative data not changed", () => {
    let data: string = "test";
    DataTrackerUtil.registerData(1, data);
    data = "test2";
    data = "test";
    expect(DataTrackerUtil.isDataChanged(1, data)).toBeFalsy();
  });

  test("object data change", () => {
    let data: any = {
      name: "salih",
      surname: "sayer"
    };

    DataTrackerUtil.registerData(1, data);
    data.name = "baki";
    expect(DataTrackerUtil.isDataChanged(1, data)).toBeTruthy();
  });

  test("nest object change", () => {
    let data: any = {
      users: [
        {
          id: 1,
          name: "salih",
          comments: [
            {
              id: 1,
              text: "test"
            }
          ]
        }
      ]
    };

    DataTrackerUtil.registerData(1, data);
    data.users[0].comments[0].text = "test2";
    expect(DataTrackerUtil.isDataChanged(1, data)).toBeTruthy();
  });
});
