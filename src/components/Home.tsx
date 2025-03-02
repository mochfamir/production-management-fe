import React, { useEffect, useState } from "react";
import { Card, Select, Table, Typography } from "antd";
import { useSelect, useTable } from "@refinedev/antd";

const { Title, Paragraph } = Typography;

export const Home: React.FC = () => {
  const isManager = localStorage.getItem("role") === "MANAGER";
  const { tableProps } = useTable({
    resource: "work-orders",
    metaData: {
      fields: ["id", "product_name", "quantity", "status", "due_date"],
    },
    queryOptions: {
      enabled: isManager,
    },
  });

  const [operator, setOperator] = useState("");
  const { tableProps: operatorTableProps } = useTable({
    resource: `work-orders?${new URLSearchParams({
      filters: `assignedToId=${operator}`,
    })}`,
    queryOptions: {
      enabled: isManager,
    },
  });

  const { selectProps } = useSelect<any>({
    resource: "operators",
    optionLabel: (item) => item.name,
    queryOptions: {
      enabled: isManager,
    },
  });

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity (Pending)",
      dataIndex: "quantity_pending",
      key: "quantity_pending",
      render: (_: any, data: any) => (
        <span>
          {data?.logs?.find((log: any) => log?.status === "PENDING")
            ?.quantityUpdated || "-"}
        </span>
      ),
    },
    {
      title: "Quantity (In Progress)",
      dataIndex: "quantity_in_progress",
      key: "quantity_in_progress",
      render: (_: any, data: any) => (
        <span>
          {data?.logs?.find((log: any) => log?.status === "IN_PROGRESS")
            ?.quantityUpdated || "-"}
        </span>
      ),
    },
    {
      title: "Quantity (Completed)",
      dataIndex: "quantity_completed",
      key: "quantity_completed",
      render: (_: any, data: any) => (
        <span>
          {data?.logs?.find((log: any) => log?.status === "COMPLETED")
            ?.quantityUpdated || "-"}
        </span>
      ),
    },
    {
      title: "Quantity (Canceled)",
      dataIndex: "quantity_canceled",
      key: "quantity_canceled",
      render: (_: any, data: any) => (
        <span>
          {data?.logs?.find((log: any) => log?.status === "CANCELED")
            ?.quantityUpdated || "-"}
        </span>
      ),
    },
  ];

  const columnsOperator = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity (Completed)",
      dataIndex: "quantity_completed",
      key: "quantity_completed",
      render: (_: any, data: any) => (
        <span>
          {data?.logs?.find((log: any) => log?.status === "COMPLETED")
            ?.quantityUpdated || "-"}
        </span>
      ),
    },
  ];

  if (isManager) {
    return (
      <div>
        <Typography.Title level={4}>
          Laporan Rekapitulasi Work Order
        </Typography.Title>
        <Table {...tableProps} columns={columns} rowKey="id" />
        <br />
        <Typography.Title level={4}>
          Laporan Hasil Tiap Operator
        </Typography.Title>
        <Select
          placeholder={"Select Operators"}
          style={{ width: "100%" }}
          {...selectProps}
          onChange={(v: any) => setOperator(v)}
        />
        <Table {...operatorTableProps} columns={columnsOperator} rowKey="id2" />
      </div>
    );
  }

  return (
    <Card title="Welcome to the Work Order Management System">
      <Title level={3}>Overview</Title>
      <Paragraph>
        This is a system for managing work orders in a manufacturing
        environment. You can create, track, and update work orders based on your
        role.
      </Paragraph>
    </Card>
  );
};
