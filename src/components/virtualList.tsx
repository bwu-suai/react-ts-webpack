import React, { useRef, useState, useEffect, useCallback } from "react";

// 重新定义：让 VirtualListItem 继承 T 的所有属性，同时确保有 id（作为唯一标识）
// 注意：T 必须包含 id 字段（通过 extends 约束）
// interface VirtualListItem<T extends { id: string | number }> extends T {}

// 组件 props 类型（简化，直接使用 T 作为数据类型，因为 T 已包含 id）
interface VirtualListProps<T extends { id: string | number }> {
  data: T[]; // 数据数组（T 必须包含 id）
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T) => React.ReactNode; // 渲染函数参数类型为 T（与数据一致）
}

/**
 * React + TypeScript 虚拟列表组件（修正类型后）
 */
const VirtualList = <T extends { id: string | number }>({
  data,
  itemHeight,
  containerHeight,
  renderItem,
}: VirtualListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState<number>(0);

  // 计算可视区域项（逻辑不变，类型已修正）
  const getVisibleItems = useCallback(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
    const buffer = 5;
    const endIndex = Math.min(data.length, startIndex + visibleCount + buffer);

    const visibleItems = data.slice(startIndex, endIndex);
    const offsetTop = startIndex * itemHeight;

    return { visibleItems, offsetTop };
  }, [scrollTop, containerHeight, itemHeight, data.length]);

  // 滚动事件监听（逻辑不变）
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = (e: any) => {
      setScrollTop(e.currentTarget.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const { visibleItems, offsetTop } = getVisibleItems();

  return (
    <div
      ref={containerRef}
      style={{
        height: `${containerHeight}px`,
        overflow: "auto",
        border: "1px solid #e0e0e0",
        position: "relative",
      }}
    >
      <div style={{ height: `${data.length * itemHeight}px`, width: "100%" }}>
        <div
          style={{ position: "absolute", top: `${offsetTop}px`, width: "100%" }}
        >
          {visibleItems.map((item) => (
            <div
              key={item.id} // 确保 item 有 id（通过 T 的约束）
              style={{ height: `${itemHeight}px`, boxSizing: "border-box" }}
            >
              {renderItem(item)} {/* 此时 item 类型为 T，与 MyItem 匹配 */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
