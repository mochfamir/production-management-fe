import React from "react";
import { Form, Input, Button, Card } from "antd";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await axiosInstance.post("/auth/register", values);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Card title="Register" style={{ maxWidth: 400, margin: "auto" }}>
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
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              type: "string",
              min: 3,
              max: 30,
              message: "Name must be min 3 and max 30 characters!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters." },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Register;
