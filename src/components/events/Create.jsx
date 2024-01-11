import React, { useContext } from "react";
import { Form, Input, DatePicker, Button } from "antd";
import axios from "axios";
import { UserAuth } from "..";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const { TextArea } = Input;

const Create = () => {
  const { login } = useContext(UserAuth);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/events/create",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response is : ", response);
    } catch (error) {
      console.error("Error in Saving data", error);
    }
  };

  return (
    <>
    <Sidebar>
      {login ? (
        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="Event Name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Address">
            <Input.Group>
              <Form.Item name={["address", "street"]} noStyle>
                <Input placeholder="Street" />
              </Form.Item>
              <Form.Item name={["address", "city"]} noStyle>
                <Input placeholder="City" />
              </Form.Item>
              <Form.Item name={["address", "state"]} noStyle>
                <Input placeholder="State" />
              </Form.Item>
              <Form.Item name={["address", "postalCode"]} noStyle>
                <Input placeholder="Postal Code" />
              </Form.Item>
              <Form.Item name={["address", "country"]} noStyle>
                <Input placeholder="Country" />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea />
          </Form.Item>

          <Form.Item label="Start Date" name="startDate">
            <DatePicker />
          </Form.Item>

          <Form.Item label="End Date" name="endDate">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>

          <Form.Item label="Organizer Info" name="organizerInfo">
            <Input />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Input />
          </Form.Item>

          <Form.Item label="Status " name="status">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : (
        navigate("/")
      )}
      </Sidebar>
    </>
  );
};

export default Create;
