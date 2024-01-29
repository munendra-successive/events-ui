import { Form, Input } from "antd";
import { Button } from "../../components";
import axios from "axios";
import { register } from "../../utils/rules";
import config from "../../config";
import { errorMessage, successMessage } from "../../utils/showMessage";

const Register = () => {
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    try {
      const { confirmPassword, ...otherValues } = values;
      const response = await axios.post(
        `${config.user_url}/register`,
        otherValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      form.resetFields();
      if (response.data.message === "Registered Successfully") {
        successMessage(response.data.message);
      }
    } catch (error) {
      if (error.response.data.message === "User already exist") {
        errorMessage("User already exist");
      } else console.error("Response  is:", error);
    }
  };

  return (
    <div style={{ justifySelf: "center" }}>
      <h2>User Registration</h2>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item label="Name" name="name" rules={register.name}>
          <Input placeholder="Enter your fullname" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={register.email}>
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={register.password}>
          <Input.Password placeholder="Please enter password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={register.confirmPassword}
        >
          <Input.Password placeholder="Enter password  again" />
        </Form.Item>

        <Form.Item label="Address" name="address" rules={register.address}>
          <Input placeholder="Enter city, state" />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={register.phone}>
          <Input placeholder="Enter your phone" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" name="Register" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
