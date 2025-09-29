import React from "react";
import IndustryTreeSelector from "./components/industery";
import { busEv } from "@/utils/index";

const App: React.FC = () => {
  const busEvc = busEv();

  const handleConfirm = (selectedKeys: string[]) => {
    console.log("选中的行业 Key 列表：", selectedKeys);
    // 此处可添加“确定”后的逻辑（如关闭弹窗、提交数据等）
  };

  const handleCancel = () => {
    console.log("取消选择");
    // 此处可添加“取消”后的逻辑（如关闭弹窗）
  };

  React.useEffect(() => {
    let hahah = (hahah: string) => {
      console.log("12312312312", hahah);
    };

    busEvc.on("message", hahah);

    return () => busEvc.off("message", hahah);
  }, []);

  const clickEmit = () => {
    busEvc.emit("message", "message");
  };

  return (
    <div className="app-container">
      <IndustryTreeSelector onConfirm={handleConfirm} onCancel={handleCancel} />
      <button onClick={clickEmit}>12312321321</button>
    </div>
  );
};

export default App;
