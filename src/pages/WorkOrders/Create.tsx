import React from "react";
import { Form, Input, DatePicker, Select, Button, InputNumber } from "antd";
import { useForm, Create, Breadcrumb, useSelect } from "@refinedev/antd";
import { useNavigate } from "react-router-dom";

export const WorkOrderCreate: React.FC = () => {
  const navigate = useNavigate();
  const { formProps, saveButtonProps } = useForm({
    resource: "work-orders",
    action: "create",
    onMutationSuccess: () => navigate("/work-orders"),
  });

  const { selectProps } = useSelect<any>({
    resource: "operators",
    optionLabel: (item) => item.name,
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      headerProps={{
        onBack: () => navigate("/work-orders"),
      }}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Product Name"
          name="productName"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            { required: true, message: "Please input the quantity!" },
            { type: "number", min: 1, message: "Quantity must be at least 1." },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Please select the due date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Assign To" name="assignedToId">
          <Select
            placeholder={"Select Operators"}
            style={{ width: 300 }}
            {...selectProps}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          initialValue="PENDING"
          rules={[{ required: true, message: "Please select the status!" }]}
        >
          <Select>
            <Select.Option value="PENDING">Pending</Select.Option>
            <Select.Option value="IN_PROGRESS">In Progress</Select.Option>
            <Select.Option value="COMPLETED">Completed</Select.Option>
            <Select.Option value="CANCELED">Canceled</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Create>
  );
};
