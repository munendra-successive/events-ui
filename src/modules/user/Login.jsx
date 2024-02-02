import React from "react";
import { Button, Form, Input, FormItem, Password } from "../../components";
import { useNavigate } from "react-router-dom";
import { login as logrules } from "../../utils/rules";
import { login } from "./service";
import { errorMessage, successMessage } from "../../utils/showMessage";
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    try {
      const response = await login(values);
      if (response.data.message === "Login Successful") {
        successMessage("Login Successful");
        localStorage.setItem("authorization", response.data.tokenIs);
        navigate("/list");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        errorMessage("Invalid Credentials");
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
      <FormItem label="Email" name="email" rules={logrules.email}>
        <Input placeholder="Enter your email" />
      </FormItem>

      <FormItem label="Password" name="password" rules={logrules.password}>
        <Password placeholder="Enter your password" />
      </FormItem>

      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          name="Log In"
        />
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          onClick={() => navigate("/register")}
          style={{ width: "100%" }}
          name="SignUp"
        />
      </FormItem>
    </Form>
  );
};

export default Login;
