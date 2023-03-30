import React from "react";
import { render, screen } from "@testing-library/react";
import { DomQuery } from "../components/DomQuery";

describe("tests for 《4 | DOM查询(上)：页面元素的渲染和行为查询》 & 《5 | DOM查询(下)：页面元素的参照物查询和优先级》", () => {
  test("get & query & find", () => {
    render(<DomQuery />);
    const getElement = screen.getByText("test1");
    // 后缀text,是一种通过标签文本作为参照物的方式
    const getAllElement = screen.getAllByText(/test/i);
    const queryElement = screen.queryByText("test3");
    const queryAllElement = screen.queryAllByText("test3");
    // debugger; // 调试这里,则需要打开vscode的运行和调试,同时在终端执行npm run test
    // get 和query区别:如果说这个元素的存在与否，并不决定这个用例能不能通过，或者说，这个元素不存在，也并不影响这个用例通过的话，我们应该使用 query。如果说这个元素不存在，那么后续的步骤就没有执行的意义，这个用例就是不通过的，我们应该使用 get，因为 get 会抛出错误，直接中断这个用例。
  });
  test("default role", () => {
    render(<DomQuery />);
    const button = screen.getByRole("tab");
    screen.debug(button);
  });
  test("aria", () => {
    render(<DomQuery />);
    // aria 属性用来表示对应角色下的额外特殊含义,可以帮助在多个相同角色中选中我们需要的那一个
    const button = screen.getByRole("button", { pressed: true });
    screen.debug(button);
  });
  test("aria-describedby", () => {
    render(<DomQuery />);
    const button = screen.getByRole("button", {
      description: "自定义aria按钮",
    });
    screen.debug(button);
  });
  // 角色数量非常多,但又不好通过别的属性来筛选时:aria-label="test_note"
  test("aria-label", () => {
    render(<DomQuery />);
    const note = screen.getByRole("generic", { name: "test_note" });
    screen.debug(note);
  });
  test("labelText", () => {
    render(<DomQuery />);
    const label = screen.getByLabelText("testLabel");
    screen.debug(label);
  });
  test("placeholder", () => {
    render(<DomQuery />);
    const placeholderInput = screen.getByPlaceholderText(
      "a query by placeholder"
    );
    screen.debug(placeholderInput);
  });
  test("value", () => {
    render(<DomQuery />);
    const valueInput = screen.getByDisplayValue("a query by value");
    screen.debug(valueInput);
  });
  test("alt", () => {
    render(<DomQuery />);
    const altImg = screen.getByAltText("a query by alt");
    screen.debug(altImg);
  });
  test("title", () => {
    render(<DomQuery />);
    const title = screen.getByTitle("a query by title");
    screen.debug(title);
  });
  // 后门,只有实在不知道怎么选取了才能使用
  test("testid", () => {
    render(<DomQuery />);
    const testidItem = screen.getByTestId("a not so good query");
    screen.debug(testidItem);
  });
});
