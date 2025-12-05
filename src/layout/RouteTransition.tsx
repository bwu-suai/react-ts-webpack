import React from "react";
import { Outlet } from "react-router";
import styles from "./RouteTransition.m.less";

// 根布局：包含动画容器、懒加载占位符和公共导航（可选）
const RootLayout = () => {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["main-container-body"]}>
        <div className={styles["page-root"]}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default React.memo(RootLayout);
