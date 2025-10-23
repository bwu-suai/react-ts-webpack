import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/stores/index";
import { Button, Input, Form, Select } from "antd";
import { setTryStore } from "@/stores/tryStore";

interface FormValues {
  nameItem: string; // Input 的值通常是 string
  selectItem: number; // Select 的 value 是 string（对应 options 的 value 类型）
}

const Home: React.FC = () => {
  const tryStore = useSelector((store: RootState) => store.tryStore);
  const dispatch = useDispatch();

  // 2. 接收 FormValues 类型的参数（自动获得类型提示）
  const clickFun = (formData: FormValues) => {
    console.log(formData.nameItem, formData.selectItem);
    dispatch(
      setTryStore({
        name: formData.nameItem,
        age: formData.selectItem, // 这里根据实际业务调整，示例仅为演示
      })
    );
  };

  // 3. 给 Form 组件指定泛型 <FormValues>，让 onFinish 自动推断类型
  return (
    <div>
      <Form<FormValues> onFinish={clickFun}>
        <Form.Item name="nameItem">
          <Input placeholder="输入"></Input>
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
    </div>
  );
};

export default Home;
