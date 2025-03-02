import React, { useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  async function checkUser() {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get("/auth/verify");
    const user = response.data?.user;

    if (token) localStorage.setItem("token", token);
    if (user?.role) {
      localStorage.setItem("role", user?.role);
      navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  const onFinish = async (values: any) => {
    try {
      const response = await axiosInstance.post("/auth/login", values);
      localStorage.setItem("token", response.data.access_token);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "auto" }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
