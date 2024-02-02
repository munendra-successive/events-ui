import {
  Button,
  Form,
  FormComp,
  FormItem,
  Input,
  Password,
} from "../../components";
import { register } from "../../utils/rules";
import { register as registerUser } from "./service";
import { errorMessage, successMessage } from "../../utils/showMessage";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form] = FormComp.useForm();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const { confirmPassword, ...otherValues } = values;
      const response = await registerUser(otherValues);
      form.resetFields();
      if (response.data.message === "Registered Successfully") {
        successMessage(response.data.message);
        navigate("/");
      }
    } catch (error) {
      if (error.response.data.message === "User already exist") {
        errorMessage("User already exist");
      } else console.error("Response  is:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        User Registration
      </h2>{" "}
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <FormItem label="Name" name="name" rules={register.name}>
          <Input placeholder="Enter your fullname" />
        </FormItem>

        <FormItem label="Email" name="email" rules={register.email}>
          <Input placeholder="Enter email" />
        </FormItem>

        <FormItem label="Password" name="password" rules={register.password}>
          <Password placeholder="Please enter password" />
        </FormItem>

        <FormItem
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={register.confirmPassword}
        >
          <Password placeholder="Enter password  again" />
        </FormItem>

        <FormItem label="Address" name="address" rules={register.address}>
          <Input placeholder="Enter city, state" />
        </FormItem>

        <FormItem label="Phone" name="phone" rules={register.phone}>
          <Input placeholder="Enter your phone" />
        </FormItem>

        <FormItem wrapperCol={{ offset: 8, span: 16 }}>
          <div
            style={{
              display: "-ms-inline-flexbox",
              justifyContent: "space-between",
            }}
          >
            <Button type="primary" htmlType="submit" name="Register" />

            <h4>Already have an account</h4>
            <Button type="primary" onClick={() => navigate("/")} name="Login" />
          </div>
        </FormItem>
      </Form>
    </div>
  );
};

export default Register;
