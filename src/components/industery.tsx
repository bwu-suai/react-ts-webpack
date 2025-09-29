import React, { useState, useMemo } from "react";
import { Tree, Input, Button, Space } from "antd";

interface IndustryTreeNode {
  key: string;
  title: string;
  children?: IndustryTreeNode[];
}

const mockIndustryData: IndustryTreeNode[] = [
  {
    key: "B",
    title: "采矿业（B）",
    children: [],
  },
  {
    key: "C",
    title: "制造业（C）",
    children: [],
  },
  {
    key: "F",
    title: "批发和零售业（F）",
    children: [],
  },
  {
    key: "J",
    title: "金融业（J）",
    children: [
      {
        key: "J66",
        title: "货币金融服务（J66）",
        children: [],
      },
      {
        key: "J67",
        title: "资本市场服务（J67）",
        children: [],
      },
      {
        key: "J68",
        title: "保险业（J68）",
        children: [
          { key: "J681", title: "人身保险（J681）" },
          { key: "J6820", title: "财产保险（J6820）" },
          { key: "J6830", title: "再保险（J6830）" },
          { key: "J6840", title: "商业养老金（J6840）" },
        ],
      },
    ],
  },
  {
    key: "G",
    title: "交通运输、仓储和邮政业（G）",
    children: [],
  },
  {
    key: "H",
    title: "住宿和餐饮业（H）",
    children: [],
  },
  {
    key: "I",
    title: "信息传输、软件和信息技术服务业（I）",
    children: [],
  },
];

// 组件属性：确定/取消的回调
interface IndustryTreeSelectorProps {
  onConfirm?: (selectedKeys: string[]) => void;
  onCancel?: () => void;
}

const IndustryTreeSelector: React.FC<IndustryTreeSelectorProps> = ({
  onConfirm,
  onCancel,
}) => {
  // 已选中的节点 key 数组
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // 搜索输入值
  const [searchValue, setSearchValue] = useState("");
  // 原始树数据（可从父组件传入，这里用模拟数据）
  const [originTreeData, setOriginTreeData] =
    useState<IndustryTreeNode[]>(mockIndustryData);

  /** 搜索过滤树节点：递归筛选包含关键词的节点 */
  const filteredTreeData = useMemo(() => {
    if (!searchValue) return originTreeData;

    // 递归过滤函数：节点标题包含关键词，或子节点有匹配，则保留
    const filterNodes = (nodes: IndustryTreeNode[]): IndustryTreeNode[] =>
      nodes
        .map((node) => {
          const isMatch = node.title.includes(searchValue);
          const filteredChildren = node.children
            ? filterNodes(node.children)
            : [];
          const hasMatchedChild = filteredChildren.length > 0;

          if (isMatch || hasMatchedChild) {
            return {
              ...node,
              children:
                filteredChildren.length > 0 ? filteredChildren : undefined,
            };
          }
          return null;
        })
        .filter(Boolean) as IndustryTreeNode[];

    return filterNodes(originTreeData);
  }, [searchValue, originTreeData]);

  /** 树节点选中回调  string[]*/
  const handleTreeCheck = (checkedKeys: any) => {
    setSelectedKeys(checkedKeys);
  };

  /** 清空已选节点 */
  const handleClearSelected = () => {
    setSelectedKeys([]);
  };

  /** 确定按钮回调 */
  const handleConfirm = () => {
    onConfirm?.(selectedKeys);
  };

  /** 取消按钮回调 */
  const handleCancel = () => {
    onCancel?.();
  };

  /** 从树数据中查找节点标题（用于右侧已选展示） */
  const findNodeTitle = (key: string, nodes: IndustryTreeNode[]): string => {
    for (const node of nodes) {
      if (node.key === key) return node.title;
      if (node.children) {
        const childTitle = findNodeTitle(key, node.children);
        if (childTitle) return childTitle;
      }
    }
    return key; // 未找到时返回 key 本身
  };

  return (
    <div
      style={{ display: "flex", height: "400px", border: "1px solid #e8e8e8" }}
    >
      {/* 左侧：树 + 搜索 */}
      <div style={{ flex: 1, borderRight: "1px solid #e8e8e8", padding: 16 }}>
        <Input
          placeholder="输入行业关键词或代码"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Tree
          checkable // 开启复选框
          treeData={filteredTreeData} // 过滤后的树数据
          checkedKeys={selectedKeys} // 已选中的 key
          onCheck={(e) => handleTreeCheck(e)} // 选中变化回调
          defaultExpandAll // 默认展开所有节点（可选：可改为默认折叠）
        />
      </div>

      {/* 右侧：已选结果 + 操作按钮 */}
      <div style={{ flex: 1, padding: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <span>已选 {selectedKeys.length}</span>
          <Button size="small" onClick={handleClearSelected}>
            清空
          </Button>
        </div>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {selectedKeys.length === 0 ? (
            <div style={{ color: "#999" }}>暂无选中内容</div>
          ) : (
            <ul>
              {selectedKeys.map((key) => (
                <li key={key}>{findNodeTitle(key, originTreeData)}</li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ marginTop: 16, textAlign: "right" }}>
          <Space>
            <Button size="small" onClick={handleCancel}>
              取消
            </Button>
            <Button size="small" type="primary" onClick={handleConfirm}>
              确定
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default IndustryTreeSelector;
