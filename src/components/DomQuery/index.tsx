// ./src/components/DomQuery/index.tsx
import { FC } from "react";

interface IProps {}

// 《4 | DOM查询(上)：页面元素的渲染和行为查询》 & 《5 |DOM查询(下)：页面元素的参照物查询和优先级》
export const DomQuery: FC<IProps> = ({}) => {
  return (
    <div>
      <div>test1</div>
      {/* ... 我们不应该为了选取方便就错误或者重复添加 role，除非是一个自定义的 UI 组件，不然大部分我们需要定位的场景其实都是有默认的 ARIA 语义的。 */}

      <button role="tab">按钮</button>
      <button aria-pressed></button>
      <button aria-describedby="description">
        <div id="description">自定义aria按钮</div>
      </button>
      <div aria-label="test_note">1234</div>
      <label>
        testLabel
        <input />
      </label>
      <input placeholder="a query by placeholder" />
      <input defaultValue="a query by value" readOnly />
      <img alt="a query by alt" />
      <span title="a query by title" />
      <div data-testid="a not so good query"></div>
    </div>
  );
};
