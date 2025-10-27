import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/stores/index";
import { Button, Input, Form, Select } from "antd";
import { setTryStore } from "@/stores/tryStore";
import { useNavigate } from "react-router";
import styles from "./home.less";

interface FormValues {
  nameItem: string; // Input 的值通常是 string
  selectItem: number; // Select 的 value 是 string（对应 options 的 value 类型）
  hahaha: string;
}

const Home: React.FC = () => {
  const tryStore = useSelector((store: RootState) => store.tryStore);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const clickFun = (formData: FormValues) => {
    dispatch(
      setTryStore({
        name: formData.nameItem,
        age: formData.selectItem,
        homeStr: formData.hahaha,
      })
    );
  };

  // 3. 给 Form 组件指定泛型 <FormValues>，让 onFinish 自动推断类型
  return (
    <div className={styles["home-page-big-box"]}>
      <Form<FormValues> onFinish={clickFun}>
        <Form.Item name="nameItem">
          <Input placeholder="输入" />
        </Form.Item>
        <Form.Item name="selectItem">
          <Select
            options={[
              { value: 17, label: "Jack" },
              { value: 25, label: "Lucy" },
              { value: 33, label: "yiminghe" },
              { value: 42, label: "Disabled" },
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

      <Button
        onClick={() => {
          console.log("API 地址：", process.env.API_BASE_URL_H);
          navigate("/sort");
        }}
      >
        点击查看环境
      </Button>

      <div className={styles["haaa"]}></div>
    </div>
  );
};

export default Home;
