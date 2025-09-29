import React from "react";
import IndustryTreeSelector from "./components/industery";

const App: React.FC = () => {
  const handleConfirm = (selectedKeys: string[]) => {
    console.log("选中的行业 Key 列表：", selectedKeys);
    // 此处可添加“确定”后的逻辑（如关闭弹窗、提交数据等）
  };

  const handleCancel = () => {
    console.log("取消选择");
    // 此处可添加“取消”后的逻辑（如关闭弹窗）
  };

  return (
    <div className="app-container">
      <IndustryTreeSelector onConfirm={handleConfirm} onCancel={handleCancel} />
    </div>
  );
};

export default App;
