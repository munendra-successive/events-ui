import React, { useContext, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserAuth } from "..";
import Sidebar from "../Sidebar";

const { TextArea } = Input;

const Edit = () => {
  const { login } = useContext(UserAuth);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/events/getById/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const eventData = response.data["data"]; // Ensure this is the correct structure

        // Populate form fields with fetched data after data is received
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
          startDate: eventData[0].startDate.substring(0, 10),
          endDate: eventData[0].endDate.substring(0, 10),
          category: eventData[0].category,
          organizerInfo: eventData[0].organizerInfo,
          type: eventData[0].type,
          status: eventData[0].status,
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/events/updateById/${id}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
              <Input />
            </Form.Item>

            <Form.Item label="End Date" name="endDate">
              <Input />
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

            <Form.Item label="Status" name="status">
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <Button type="primary" htmlType="submit">
                Update
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

export default Edit;
