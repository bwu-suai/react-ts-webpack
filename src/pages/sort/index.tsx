import React from "react";
import { useNavigate } from "react-router";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/index";
import styles from "./index.m.less";
import IndustryTreeSelector from "@/components/industery";
1;
const Home: React.FC = () => {
  const navigate = useNavigate();
  const tryStore = useSelector((state: RootState) => state.tryStore);

  const [modalShow, setModalShow] = React.useState(false);

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
      <Button onClick={() => setModalShow(true)}>点击弹窗</Button>
      <div className={styles["haaa"]}></div>
      <Modal open={modalShow} width="70vw" onCancel={() => setModalShow(false)}>
        <div style={{ height: "600px", width: "100%", overflow: "auto" }}>
          <IndustryTreeSelector />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
