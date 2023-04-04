import { FC, useState } from "react";
import { Form } from "@douyinfe/semi-ui";

interface IProps {}

// 《6 | DOM断言：页面元素的断言》
export const DomExpect: any = ({}) => {
  const [semiFormValues, setSemiFormValues] = useState({
    username: "zhenmin",
    age: 23,
    sex: "man",
    hobby: "code",
  });
  return (
    <div>
      <div aria-label="empty_note"></div>
      <div role="note" style={{ display: "none" }} aria-hidden>
        1234
      </div>
      <div role="note">1234</div>
      {/* code validation */}
      {/* <div
        role="note"
        style={{ display: "none" }}
        className="test hidden"
        aria-hidden
      >
        1234
      </div> */}
      {/* 虽然它包含 form 角色，但是必须要加上 aria-label 才可以使用 */}
      {/* screen.getByRole("form")进行筛选，这是一个很特殊的规则，因为 form */}
      {/* 元素没有一个可访问的信息 */}
      <form aria-label="form">
        <input
          type="text"
          name="username"
          disabled
          aria-disabled
          defaultValue="zhenmin"
          aria-label="form_username"
        />
        <input
          type="number"
          name="age"
          defaultValue={23}
          required
          aria-label="form_age"
        />
        <input
          type="radio"
          name="sex"
          value="man"
          defaultChecked
          aria-checked
          aria-label="form_sex"
        />
        <input type="radio" name="sex" value="woman" aria-label="form_sex" />
      </form>
      {/* semi 表单验证 */}
      <Form
        initValues={semiFormValues}
        aria-label="semi-form"
        onChange={(data: any): void => {
          setSemiFormValues(data);
        }}
      >
        <Form.Input field="username" disabled name="username" />
        <Form.InputNumber field="age" required name="age" />
        <Form.RadioGroup field="sex" name="sex">
          <Form.Radio value="man" />
          <Form.Radio value="woman" />
        </Form.RadioGroup>
        <Form.Select field="hobby" name="hobby">
          <Form.Select.Option value="code">code</Form.Select.Option>
          <Form.Select.Option value="read">read</Form.Select.Option>
        </Form.Select>
      </Form>
      <input type="hidden" role="note" value={JSON.stringify(semiFormValues)} />
    </div>
  );
};
