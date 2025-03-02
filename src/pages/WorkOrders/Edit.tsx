import React, { useEffect } from "react";
import { Form, Input, DatePicker, Select, Button, InputNumber } from "antd";
import { useForm, Edit, useSelect } from "@refinedev/antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDelete } from "@refinedev/core";

enum ProductionStage {
  MATERIAL_PREPARATION = "Persiapan Material",
  CUTTING = "Pemotongan",
  ASSEMBLY = "Perakitan",
  PAINTING = "Pengecatan",
  QUALITY_CONTROL = "Kontrol Kualitas",
  PACKAGING = "Pengemasan",
}

export const WorkOrderEdit: React.FC = () => {
  const isManager = localStorage.getItem("role") === "MANAGER";
  const navigate = useNavigate();
  const location = useLocation();
  const { nextStatus } = location.state || {};
  const { id } = useParams();

  const { formProps, saveButtonProps } = useForm({
    resource: "work-orders",
    action: "edit",
    id,
    onMutationSuccess: () => navigate("/work-orders"),
  });

  const { mutate: deleteWorkOrder } = useDelete();
  const handleDelete = () => {
    deleteWorkOrder(
      {
        resource: "work-orders",
        id: id as string,
      },
      {
        onSuccess: () => {
          alert("Work order deleted successfully!");
          navigate("/work-orders");
        },
      }
    );
  };

  const { selectProps } = useSelect<any>({
    resource: "operators",
    optionLabel: (item) => item.name,
    queryOptions: {
      enabled: isManager,
    },
  });

  useEffect(() => {
    if (!isManager && nextStatus !== "stage") {
      const _nextStatus = nextStatus || formProps.form?.getFieldValue("status");
      setTimeout(() => {
        formProps.form?.setFieldValue("status", _nextStatus);
      }, 300);
    }
  }, [nextStatus]);

  if (isManager) {
    return (
      <Edit
        saveButtonProps={saveButtonProps}
        headerProps={{
          onBack: () => navigate("/work-orders"),
        }}
        headerButtons={
          isManager && (
            <Button
              type="primary"
              danger
              onClick={handleDelete}
              style={{ marginTop: 16 }}
            >
              Delete Work Order
            </Button>
          )
        }
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
              {
                type: "number",
                min: 1,
                message: "Quantity must be at least 1.",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} type="number" />
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
              style={{ width: "100%" }}
              {...selectProps}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
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
      </Edit>
    );
  }

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      headerProps={{
        onBack: () => navigate("/work-orders"),
      }}
      headerButtons={" "}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select the status!" }]}
        >
          <Select disabled={!isManager}>
            <Select.Option value="PENDING">Pending</Select.Option>
            <Select.Option value="IN_PROGRESS">In Progress</Select.Option>
            <Select.Option value="COMPLETED">Completed</Select.Option>
            <Select.Option value="CANCELED">Canceled</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          style={{ width: "100%" }}
          rules={[
            { required: true, message: "Please input the quantity!" },
            {
              type: "number",
              min: 1,
              message: "Quantity must be at least 1.",
            },
          ]}
        >
          <InputNumber
            disabled={nextStatus === "stage"}
            style={{ width: "100%" }}
            type="number"
          />
        </Form.Item>

        {nextStatus === "COMPLETED" && (
          <Form.Item
            label="Note"
            name="note"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        {nextStatus === "stage" && (
          <Form.Item label="Production Stage" name="productionStage">
            <Select style={{ width: "100%" }}>
              {Object.entries(ProductionStage).map(([key, value]) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Edit>
  );
};
