import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/stores/index";
import { Button, Input, Form, Select, Modal, Space } from "antd";
import { setTryStore } from "@/stores/tryStore";
import { useNavigate } from "react-router";
import styles from "./home.less";

interface FormValues {
  nameItem: string; 
  selectItem: number; 
  hahaha: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const tryStore = useSelector((store: RootState) => store.tryStore);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickFun = (formData: FormValues) => {
    console.log("API 地址：", process.env.API_BASE_URL_H);
    dispatch(
      setTryStore({
        name: formData.nameItem,
        age: formData.selectItem,
        homeStr: formData.hahaha,
      })
    );
  };

  return (
    <div className={styles["home-page-big-box"]}>
      <Form<FormValues> onFinish={clickFun}>
        <Form.Item name="nameItem">
          <Input placeholder="输入" />
        </Form.Item>
        <Form.Item name="selectItem">
          <Select
            options={[
              { value: 17, label: "Jack年纪" },
              { value: 25, label: "Lucy年纪" },
              { value: 33, label: "yiminghe年纪" },
              { value: 42, label: "Joker年纪" },
            ]}
          />
        </Form.Item>
        <Form.Item name="hahaha">
          <Input placeholder="hahaha" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">提交！！！</Button>
        </Form.Item>
      </Form>
      <div>我是home</div>
      <div>{JSON.stringify(tryStore)}</div>

      <Space>
        <Button
          style={{ margin: `20px 0` }}
          onClick={() => {
            navigate("/sort");
          }}
        >
          点击去sort页面
        </Button>

        <Button
          style={{ margin: `20px 0` }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          点击打开modal
        </Button>

        <Button
          style={{ margin: `20px 0` }}
          onClick={() => {
            navigate("/listpage");
          }}
        >
          去listpage页面
        </Button>

        <Button
          onClick={() => {
            setIsAnimation(true);
            let time = setTimeout(() => {
              setIsAnimation(false);
              clearTimeout(time);
            }, 6000);
          }}
          type="primary"
        >
          点击开始动画
        </Button>

        <Button
          type="dashed"
          onClick={() => {
            navigate("/chatComponents");
          }}
        >
          去chatComponents页面
        </Button>

        <Button
          onClick={() => {
            navigate("/pullRefresh");
          }}
        >
          去下拉刷新页面pullRefresh
        </Button>
      </Space>

      <div
        className={`${styles["haaa"]} ${isAnimation ? styles["donghua"] : ""}`}
      ></div>

      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <p>哈哈哈哈哈哈332211</p>
      </Modal>
    </div>
  );
}
