import React from "react";
import styles from "./index.m.less";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const notFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["notFound-page-big-box"]}>
      <h1>没有找到页面！</h1>
      <div className={styles["back-page-box"]}>
        <Button onClick={() => navigate("/", { replace: true })}>
          点击去home
        </Button>
      </div>
    </div>
  );
};

export default notFound;
