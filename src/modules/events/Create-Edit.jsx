import React, { useContext, useEffect } from "react";
import { Form, Input, Button, DatePicker, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { edit } from "../../utils/rules";
import moment from "moment";
import { setHeader } from "./setHeader";
const { TextArea } = Input;

const Edit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/events/getById/${id}`,
        {
          headers: setHeader.json,
        }
      );
      const eventData = response.data["data"];
      form.setFieldsValue({
        name: eventData[0].name,
        address: {
          street: eventData[0].address.street,
          city: eventData[0].address.city,
          state: eventData[0].address.state,
          postalCode: eventData[0].address.postalCode,
          country: eventData[0].address.country,
        },
        description: eventData[0].description,
        startDate: moment(eventData[0].startDate),
        endDate: moment(eventData[0].endDate),
        category: eventData[0].category,
        organizerInfo: eventData[0].organizerInfo,
        type: eventData[0].type,
        status: eventData[0].status,
      });
    } catch (error) {
      if (error.response.status === 403) {
        message.error({
          type: "error",
          content: "You are Unauthorized, Please Login",
          duration: 2,
        });
        navigate("/");
      } else console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    if (id !== "create") {
      fetchData();
    }
  }, [id, form]);

  const Edit = async (values) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/events/updateById/${id}`,
        values,
        {
          headers: setHeader.json,
        }
      );
      alert("record updated successfully");
      form.resetFields();
    } catch (error) {
      alert("Error Occured");
      if (error.response.status === 403) navigate("/");
      else console.error("Error in  Saving data: ", error);
    }
  };

  const create = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/events/create`,
        values,
        {
          headers: setHeader.json,
        }
      );
      form.resetFields();
      alert("record added successfully");
    } catch (error) {
      alert("Error Occured");
      if (error.response.status === 403) navigate("/");
      else console.error("Error in Saving data", error);
    }
  };
  const handleSubmit = async (values) => {
    if (id !== "create") {
      Edit(values);
    } else {
      create(values);
    }
  };

  return (
    <Sidebar>
      <Form
        form={form}
        onFinish={handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label="Event Name" name="name" rules={edit.eventName}>
          <Input />
        </Form.Item>

        <Form.Item label="Address">
          <Input.Group>
            <Form.Item name={["address", "street"]} rules={edit.street} noStyle>
              <Input placeholder="Street" />
            </Form.Item>
            <Form.Item name={["address", "city"]} rules={edit.city} noStyle>
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item name={["address", "state"]} rules={edit.state} noStyle>
              <Input placeholder="State" />
            </Form.Item>
            <Form.Item
              name={["address", "postalCode"]}
              rules={edit.postalCode}
              noStyle
            >
              <Input placeholder="Postal Code" />
            </Form.Item>
            <Form.Item
              name={["address", "country"]}
              rules={edit.country}
              noStyle
            >
              <Input placeholder="Country" />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={edit.description}
        >
          <TextArea />
        </Form.Item>

        <Form.Item label="Start Date" name="startDate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="End Date" name="endDate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Category" name="category" rules={edit.category}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Organizer Info"
          name="organizerInfo"
          rules={edit.organizerInfo}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Type" name="type" rules={edit.type}>
          <Input />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={edit.status}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Sidebar>
  );
};

export default Edit;
