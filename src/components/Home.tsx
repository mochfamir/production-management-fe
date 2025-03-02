import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

export const Home: React.FC = () => {
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
