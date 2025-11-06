import React from "react";
import VirtualList from "@/components/virtualList";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface MyItem {
  id: number;
  name: string;
  age: number;
}

export default function ListPage() {
  const navigate = useNavigate();

  // 生成 10000 条测试数据（类型为 MyItem[]）
  const generateData = (): MyItem[] => {
    return Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `用户 ${i + 1}`,
      age: 18 + (i % 30), // 18-47 岁
    }));
  };

  const bigData = generateData();

  // 自定义渲染每项的函数（参数类型为 MyItem，确保类型安全）
  const renderItem = (item: MyItem) => {
    return (
      <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
        <h4>ID: {item.id}</h4>
        <p>姓名: {item.name}</p>
        <p>年龄: {item.age}</p>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button onClick={() => navigate(-1)} type="primary">
        返回
      </Button>
      <h2>React + TypeScript 虚拟列表</h2>
      <p>总数据量：{bigData.length} 条</p>
      <VirtualList<MyItem>
        data={bigData}
        itemHeight={120} // 每项高度 120px
        containerHeight={500} // 容器高度 500px
        renderItem={renderItem}
      />
    </div>
  );
}
