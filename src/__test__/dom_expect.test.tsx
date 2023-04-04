import React from "react";
import { render, screen } from "@testing-library/react";
import { DomExpect } from "../components/DomExpect/index";
import { act } from "react-dom/test-utils";

describe("tests for 《6 | DOM断言:页面元素的断言》", () => {
  test("visible validation", () => {
    render(<DomExpect />);
    const emptyNote = screen.getByRole("generic", { name: "empty_note" });
    const [hiddenNote] = screen.getAllByRole("note", { hidden: true });
    const normalNote = screen.getByRole("note");
    expect(emptyNote).toBeEmptyDOMElement(); //只有<div aria-label="empty_note"></div> 是匹配 toBeEmptyDOMElement的，因为只有它的标签之间没有包含任何内容
    expect(hiddenNote).not.toBeVisible(); //只有<div role="note" style={{ display: "none" }} aria-hidden>1234</div> 是不能满足的，因为我们对它加上了display: none的样式，所以是不可见于 DOM 树的；
    // aria-hidden并不会影响 visible 的判断，这是一个语义的属性，并不作为匹配的一个标准。如果只是加了 aria-hidden 而实际可见，仍然会匹配 toBeVisible
    expect(emptyNote).toBeInTheDocument(); //  这三个 DOM 都是可以满足toBeInTheDocument的，因为这几个元素都在文本文档中
    expect(hiddenNote).toBeInTheDocument();
    expect(normalNote).toBeInTheDocument();
    expect(normalNote).toHaveTextContent(/1/i);
  });
  test("form validation without semi", async () => {
    render(<DomExpect />);
    const form = screen.getByRole("form", { name: "form" });
    const username = screen.getByRole("textbox", { name: "form_username" });
    const age = screen.getByRole("spinbutton", { name: "form_age" });
    const manCheckbox = screen.getByRole("radio", {
      checked: true,
      name: "form_sex",
    });
    const womanCheckbox = screen.getByRole("radio", {
      checked: false,
      name: "form_sex",
    });
    expect(username).toBeDisabled();
    expect(age).toBeEnabled();
    expect(age).toBeRequired();
    await act(async () => {
      age.focus();
      expect(age).toHaveFocus();
    });

    expect(manCheckbox).toBeChecked();
    expect(womanCheckbox).not.toBeChecked();
    expect(form).toHaveFormValues({
      username: "zhenmin",
      age: 23,
      sex: "man",
    });
    expect(age).toHaveValue(23);
  });
  test("code validation", () => {
    render(<DomExpect />);
    const [hiddenNote] = screen.getAllByRole("note", { hidden: true });
    expect(hiddenNote).toHaveAttribute("aria-hidden");
    // have no class
    // expect(hiddenNote).toHaveClass("test"); // 2023.4.4 didn't work received nothing
    expect(hiddenNote).toHaveStyle("display: none");
  });
  test("visible validation with semi", async () => {
    render(<DomExpect />);

    const form = screen.getByRole("form", { name: "semi-form" });
    const username = screen.getByLabelText("username");
    const age = screen.getByLabelText("age");
    const sex = screen.getByLabelText("sex");
    const hobby = screen.getByLabelText("hobby");
    expect(username).toBeDisabled();
    expect(age).toBeEnabled();
    expect(age).toBeRequired();
    await act(async () => {
      age.focus();
      expect(age).toHaveFocus();
    });
    // expect(username).toHaveValue('zhenmin');
    // expect(hobby).toHaveValue('code');
    // expect(form).toHaveFormValues({
    //   username: 'zhenmin',
    //   age: 23,
    //   sex: 'man',
    //   hobby: 'code',
    // });
    const hiddenNotes = screen.getAllByRole("note", { hidden: true });
    expect(hiddenNotes[2]).toHaveAttribute(
      "value",
      JSON.stringify({
        username: "zhenmin",
        age: 23,
        sex: "man",
        hobby: "code",
      })
    );
  });
});
