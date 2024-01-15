import React, {  useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const Register = () => {
  const [message, setMessage] = useState("");
  const handleSubmit = async (values) => {
    try {
      const { confirmPassword, ...otherValues } = values;
      const response = await axios.post(
        "http://localhost:8000/users/register",
        otherValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response is: ", response);
      if (response.data.message === "Registered Successfully") {
        setMessage("Registered Successfully");
      } else {
        setMessage("User already exist");
      }
    } catch (error) {
      console.error("Response is:", error);
    }
  };

  return (
    <div style={{ justifySelf: "center" }}>
      <h2>User Registration</h2>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
            {
              type: "string",
              min: 3,
              message: "Name must be at least 3 characters",
            },
          ]}
        >
          <Input placeholder="Enter your fullname" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Please enter password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Enter password  again" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, min: 10, message: "Please input you  address!" },
          ]}
        >
          <Input placeholder="Enter city, state" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              len: 10,
              message: "Please input your phone number!",
            },
            {
              pattern: /^[0-9\b]+$/,
              message: "Please enter a valid phone number!",
            },
          ]}
        >
          <Input placeholder="Enter your phone" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <h4>{message}</h4>
    </div>
  );
};

export default Register;
