import React, { useState } from "react";
import { PullToRefreshify } from "react-pull-to-refreshify";
import styles from "./index.less";

type PullStatus =
  | "normal"
  | "pulling"
  | "canRelease"
  | "refreshing"
  | "complete";

const pullRefresh: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [dataList, setDataList] = useState(
    Array.from({ length: 20 }, (_, i) => i)
  );

  function renderText(pullStatus: PullStatus, percent: number) {
    switch (pullStatus) {
      case "pulling":
        return (
          <div>
            {`下拉即可刷新 `}
            <span style={{ color: "green" }}>{`${percent.toFixed(0)}%`}</span>
          </div>
        );

      case "canRelease":
        return "释放即可刷新...";

      case "refreshing":
        return "刷新中";

      case "complete":
        return "刷新成功";

      default:
        return "";
    }
  }

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "auto" }}>
      <PullToRefreshify
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderText={renderText}
        completeDelay={0}
      >
        <div className={styles["pull-item-big-view"]}>
          {dataList.map((item, i) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </PullToRefreshify>
    </div>
  );
};

export default pullRefresh;
