import React, { useState } from "react";
import { PullToRefreshify, PullStatus } from "react-pull-to-refreshify";

interface propsType {
  children: React.ReactNode;
}

const pulltoRefresh: React.FC<propsType> = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderText = (state: PullStatus, percent: number) => {
    switch (state) {
      case "pulling":
        return (
          <div>
            下拉即可刷新
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
  };

  return (
    <div>
      <PullToRefreshify
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderText={renderText}
      >
        <div>{props.children}</div>
      </PullToRefreshify>
    </div>
  );
};

export default pulltoRefresh;
