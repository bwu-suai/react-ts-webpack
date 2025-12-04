import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./index.less";
import { Space, Input, Button, Form } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// 定义消息类型
interface Message {
  id: string;
  content: string;
  sender: "me" | "other"; // 发送者：自己/其他人
  time: string; // 消息时间
}

const chatComponents = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const divRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const endMessage = () => {
    if (!inputValue) return;
    setMessageList((val) => {
      let list: Message[] = [
        ...val,
        {
          id: `${Math.floor(10000000 + Math.random() * 90000000)}`,
          content: inputValue,
          sender: "me",
          time: `${new Date().getTime()}`,
        },
      ];
      return list;
    });
    const value = inputValue;
    setInputValue("");
    setScrollTop();
    setTimeout(() => {
      setMessageList((val) => {
        let list: Message[] = [
          ...val,
          {
            id: `${Math.floor(10000000 + Math.random() * 90000000)}`,
            content: value,
            sender: "other",
            time: `${new Date().getTime()}`,
          },
        ];
        return list;
      });
      setScrollTop();
    }, 2000);
  };

  useEffect(() => {
    let arrList: Message[] = Array.from({ length: 20 }, (_, i) => ({
      id: `${Math.floor(10000000 + Math.random() * 90000000)}`,
      content: `这是第一条消息${i + 1}`,
      sender: i % 2 === 0 ? "other" : "me",
      time: `${new Date().getTime()}`,
    }));
    setMessageList(arrList);
    setScrollTop();
  }, []);

  const setScrollTop = () =>
    setTimeout(() => {
      let eByView = document.getElementById("chat-content-view-id");
      if (divRef.current) {
        divRef.current.scrollTop =
          eByView?.scrollHeight || divRef.current.scrollTop;
      }
    }, 10);

  return (
    <div className={styles["chat-window"]}>
      <div className={styles["chat-center-box"]}>
        <div className={styles["chat-title-view"]}>
          <div
            className={styles["chat-title-left-back"]}
            onClick={() => {
              navigate(-1);
            }}
          >
            <LeftOutlined />
          </div>
          <div>聊天界面</div>
          <div></div>
        </div>
        <div className={styles["chat-content-view"]} ref={divRef}>
          <div id="chat-content-view-id">
            {messageList.map((el) => {
              return el.sender === "me" ? (
                <div className={styles["chat-me-view"]} key={el.id}>
                  <div
                    className={styles["message-big-box"]}
                    style={{
                      marginLeft: "80px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div className={`${styles["message-two"]}`}>
                      {el.content}
                    </div>
                  </div>
                  <div className={styles["avatar"]}></div>
                </div>
              ) : (
                <div className={styles["chat-other-view"]} key={el.id}>
                  <div className={styles["avatar"]}></div>
                  <div className={styles["message"]}>{el.content}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles["chat-footer-view"]}>
          <Form style={{ width: "100%", height: "100%" }}>
            <Space.Compact style={{ width: "100%", height: "100%" }}>
              <Input
                placeholder="请输入内容..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <Button
                htmlType="submit"
                type="primary"
                style={{ height: "100%" }}
                onClick={() => endMessage()}
              >
                发送
              </Button>
            </Space.Compact>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default chatComponents;
