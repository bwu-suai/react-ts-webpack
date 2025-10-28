import React from "react";
import { useNavigate } from "react-router";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/index";
import styles from "./index.less";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const tryStore = useSelector((state: RootState) => state.tryStore);

  return (
    <div className={styles['sort-page-big-box']}>
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
    </div>
  );
};

export default Home;
