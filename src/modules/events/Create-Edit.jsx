import React, { useEffect } from "react";
import {
  Button,
  FormItem,
  TextArea,
  DatePicker,
  InputGroup,
  Input,
  Form,
  FormComp,
  Sidebar,
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { edit } from "../../utils/rules";
import { fetchEditData, setFormFields, EditData, createData } from "./service";
import { errorMessage, successMessage } from "../../utils/showMessage";

const Edit = () => {
  const navigate = useNavigate();
  const [form] = FormComp.useForm();
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
      successMessage("Record updated successfully");
      form.resetFields();
      navigate("/list");
    } catch (error) {
      errorMessage("Error Occured");
      if (error.response.status === 403) navigate("/");
      else console.error("Error in  Saving data: ", error);
    }
  };

  const create = async (values) => {
    try {
      await createData(values);
      form.resetFields();
      successMessage("Record added successfully");
    } catch (error) {
      errorMessage("Error Occured");
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
        <FormItem label="Event Name" name="name" rules={edit.eventName}>
          <Input placeholder="Event Name" />
        </FormItem>

        <FormItem label="Address">
          <InputGroup>
            <FormItem name={["address", "street"]} rules={edit.street} noStyle>
              <Input placeholder="Street" />
            </FormItem>
            <FormItem name={["address", "city"]} rules={edit.city} noStyle>
              <Input placeholder="City" />
            </FormItem>
            <FormItem name={["address", "state"]} rules={edit.state} noStyle>
              <Input placeholder="State" />
            </FormItem>
            <FormItem
              name={["address", "postalCode"]}
              rules={edit.postalCode}
              noStyle
            >
              <Input placeholder="Postal Code" />
            </FormItem>
            <FormItem
              name={["address", "country"]}
              rules={edit.country}
              noStyle
            >
              <Input placeholder="Country" />
            </FormItem>
          </InputGroup>
        </FormItem>

        <FormItem
          label="Description"
          name="description"
          rules={edit.description}
        >
          <TextArea />
        </FormItem>

        <FormItem label="Start Date" name="startDate">
          <DatePicker />
        </FormItem>

        <FormItem label="End Date" name="endDate">
          <DatePicker />
        </FormItem>

        <FormItem label="Category" name="category" rules={edit.category}>
          <Input />
        </FormItem>

        <FormItem
          label="Organizer Info"
          name="organizerInfo"
          rules={edit.organizerInfo}
        >
          <Input />
        </FormItem>

        <FormItem label="Type" name="type" rules={edit.type}>
          <Input />
        </FormItem>

        <FormItem label="Status" name="status" rules={edit.status}>
          <Input />
        </FormItem>

        <FormItem wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit" name="Save" />
        </FormItem>
      </Form>
    </Sidebar>
  );
};

export default Edit;
