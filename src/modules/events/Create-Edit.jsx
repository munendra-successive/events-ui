import React, { useEffect } from "react";
import { Form, Input, DatePicker } from "antd";
import { Button } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { edit } from "../../utils/rules";
import { fetchEditData, setFormFields, EditData, createData } from "./service";
import { errorMessage } from "../../utils/showMessage";
const { TextArea } = Input;

const Edit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const response = await fetchEditData(id);
      const eventData = response.data["data"];
      form.setFieldsValue(setFormFields(eventData));
    } catch (error) {
      if (error.response.status === 403) {
        errorMessage("You are Unauthorized, Please Login");
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
      await EditData(values, id);
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
      await createData(values);
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
          <Input placeholder="Event Name" />
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
          <Button type="primary" htmlType="submit" name="Save" />
        </Form.Item>
      </Form>
    </Sidebar>
  );
};

export default Edit;
