import React from "react";
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title, Text } = Typography;

export const WorkOrderShow: React.FC = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const record = data?.data;

  return (
    <Show>
      <Title level={5}>Product Name</Title>
      <Text>{record?.product_name}</Text>

      <Title level={5}>Quantity</Title>
      <Text>{record?.quantity}</Text>

      <Title level={5}>Status</Title>
      <Text>{record?.status}</Text>

      <Title level={5}>Due Date</Title>
      <Text>{record?.due_date}</Text>
    </Show>
  );
};
