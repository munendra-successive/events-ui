import { Flex as FlexComp, Spin } from "antd";

const Flex = () => {
  return (
    <FlexComp gap="large">
      <Spin size="large">
        <div className="content" />
      </Spin>
    </FlexComp>
  );
};

export default Flex;
