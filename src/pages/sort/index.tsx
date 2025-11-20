import React from "react";
import { useNavigate } from "react-router";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/index";
import styles from "./index.less";
import IndustryTreeSelector from "@/components/industery";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const tryStore = useSelector((state: RootState) => state.tryStore);

  return (
    <div className={styles["sort-page-big-box"]}>
      我是sort
      <div style={{ margin: "10px 0" }}>{JSON.stringify(tryStore)}</div>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        点击返回
      </Button>
      <div className={styles["haaa"]}></div>
      <Modal open={true} width="70vw">
        <div style={{ height: "600px", width: "100%", overflow: "auto" }}>
          <IndustryTreeSelector />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
