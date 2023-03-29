import React from "react";

describe("examples for jest expect", () => {
  // ... 本节课后续的test就放在这里
  test("基础类型的比较", () => {
    // tobe
    expect(1 + 1).toBe(2);
    // not
    expect(1 + 1).not.toBe(3);

    // boolean
    expect(true).toBe(true);
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
    // undefined
    expect(undefined).toBe(undefined);
    expect(undefined).not.toBeDefined();
    expect(undefined).toBeUndefined();
    // undefined
    const test1 = () => {
      console.log(test1);
    };
    expect(test1()).toBeUndefined();
    // // 浮点数
    // expect(0.2 + 0.1).toBe(0.3);
    //  Expected: 0.3;
    //  Received: 0.30000000000000004;
  });
  test("基础类型的比较", () => {
    // tobe
    expect(1 + 1).toBe(2);
    // not
    expect(1 + 1).not.toBe(3);
    // 浮点数
    expect(0.2 + 0.1).toBeCloseTo(0.3);
    // NaN
    expect(NaN).toBe(NaN);
    expect(NaN).toBeNaN();
    // +0 -0
    expect(+0).not.toBe(-0);
  });
  test("引用类型的比较", () => {
    const a = { obj1: { name: "obj1", obj2: { name: "obj2" } } };
    const b = Object.assign(a);
    const c = JSON.parse(JSON.stringify(a));
    expect(a).toBe(b);
    expect(a).not.toBe(c); // 浅比较
    expect(a).toEqual(b); // 深度递归比较
    expect(a).toEqual(c);
  });
  test("数字符号", () => {
    // >
    expect(3).toBeGreaterThan(2);
    // <
    expect(3).toBeLessThan(4);
    // >=
    expect(3).toBeGreaterThanOrEqual(3);
    expect(3).toBeGreaterThanOrEqual(2);
    // <=
    expect(3).toBeLessThanOrEqual(3);
    expect(3).toBeLessThanOrEqual(4);
  });
  test("正则匹配", () => {
    expect("This is a regexp validation").toMatch(/regexp/);
    const obj = { prop1: "test", prop2: "regexp validation" };
    const childObj = { prop1: "test" };
    expect(obj).toMatchObject(childObj);
  });
  test("表单验证", () => {
    // 数组元素验证
    expect([1, 2, 3]).toContain(1);
    expect([1, 2, 3]).toEqual(expect.arrayContaining([1, 2]));
    expect([{ a: 1, b: 2 }]).toContainEqual({ a: 1, b: 2 });
    // 数组长度
    expect([1, 2, 3]).toHaveLength(3);
    // 对象属性验证
    const testObj = {
      prop1: 1,
      prop2: {
        child1: 2,
        child2: "test",
      },
    };
    // 复合属性
    expect(testObj).toHaveProperty("prop1");
    expect(testObj).toHaveProperty("prop2.child1");
  });
  // test("错误抛出", () => {
  //   const throwError = () => {
  //     const err = new Error("console err: this is a test error!");
  //     throw err;
  //   };
  //   expect(throwError).toThrow();
  //   expect(throwError).toThrowError();

  //   const catchError = () => {
  //     try {
  //       const err = new Error("console err: this is a test error!");
  //       throw err;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   // 如果我们在方法中，已经有了错误的捕获，那么断言本身是无法生效的
  //   expect(catchError).not.toThrow();
  //   expect(catchError).not.toThrowError();
  // });
  test("同步自定义匹配器", () => {
    const toBeBetweenZeroAndTen = (num: number) => {
      if (num >= 0 && num <= 10) {
        return {
          message: () => "",
          pass: true,
        };
      } else {
        return {
          message: () => "expected num to be a number between zero and ten",
          pass: false,
        };
      }
    };
    expect.extend({
      toBeBetweenZeroAndTen,
    });
    expect(8).toBeBetweenZeroAndTen();
    expect(11).not.toBeBetweenZeroAndTen();
  });
  test("异步自定义匹配器", async () => {
    // debugger; 然后打开vscode的js调试终端
    const toBeBetweenZeroAndTen = async (num: number) => {
      const res = await new Promise<{ message: () => string; pass: boolean }>(
        (resolve) => {
          setTimeout(() => {
            if (num >= 0 && num <= 10) {
              resolve({
                message: () => "",
                pass: true,
              });
            } else {
              resolve({
                message: () =>
                  "expected num to be a number between zero and ten",
                pass: false,
              });
            }
          }, 1000);
        }
      );
      return (
        res || {
          message: () => "expected num to be a number between zero and ten",
          pass: false,
        }
      );
    };
    expect.extend({
      toBeBetweenZeroAndTen,
    });
    await expect(8).toBeBetweenZeroAndTen();
    await expect(11).not.toBeBetweenZeroAndTen();
  });
});
