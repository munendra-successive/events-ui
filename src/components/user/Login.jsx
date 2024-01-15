import React, { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "./UserAuthContext";
const Login = () => {
  const { setLogin } = useContext(UserAuth);

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authorization"),
          },
        }
      );
      console.log("response is: ", response.data);
      if (response.data.message === "Login Successful") {
        localStorage.setItem("authorization", response.data.tokenIs);
        setLogin(true);
        navigate("/list");
        setMessage("Login Successful");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error is: ", error);
    }
  };
  return (
    <>
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
      {message && <h4>"Message:"{message}</h4>}
    </>
  );
};

export default Login;
