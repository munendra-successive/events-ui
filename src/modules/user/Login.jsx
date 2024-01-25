import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const isLoggedOut = () => {
    return localStorage.getItem("authorization") === null;
  };

  useEffect(() => {
    if (!isLoggedOut()) {
      navigate(-1);
    }
  });
  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authorization"),
          },
        }
      );
      if (response.data.message === "Login Successful") {
        message.success({
          type: "success",
          content: "Login Successful",
          duration: 2,
        });
        localStorage.setItem("authorization", response.data.tokenIs);
        navigate("/list");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error({
          type: "error",
          content: "Invalid Credentials",
          duration: 2,
        });
      } else {
        console.error("Error during login: ", error);
      }
    }
  };
  return (
    <Form
      name="loginForm"
      onFinish={handleLogin}
      style={{ width: 300, margin: "auto", marginTop: 100 }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Log In
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          onClick={() => navigate("/register")}
          style={{ width: "100%" }}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
