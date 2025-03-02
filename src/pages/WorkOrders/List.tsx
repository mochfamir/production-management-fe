import React from "react";
import { Table, Tag, Space, Button, Flex, Radio, InputNumber } from "antd";
import { useTable, List, FilterDropdown } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { nextStatus } from "../../utils/current-status";

export const WorkOrderList: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const isManager = localStorage.getItem("role") === "MANAGER";

  const { tableProps } = useTable({
    resource: "work-orders",
    metaData: {
      fields: ["id", "product_name", "quantity", "status", "due_date"],
    },
  });

  return (
    <List title={<h3>Work Orders</h3>}>
      {isManager && (
        <Flex justify="flex-end" style={{ marginBottom: 10 }}>
          <Button
            type="primary"
            onClick={() => navigate("/work-orders/create")}
          >
            Create Work Order
          </Button>
        </Flex>
      )}
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="productName" title="Product Name" />

        <Table.Column dataIndex="quantity" title="Quantity" />

        <Table.Column
          dataIndex="status"
          title="Status"
          render={(status) => (
            <Tag color={status === "Completed" ? "green" : "blue"}>
              {status.split("_").join(" ")}
            </Tag>
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Radio.Group>
                <Radio value="PENDING">Pending</Radio>
                <Radio value="IN_PROGRESS">In Progress</Radio>
                <Radio value="COMPLETED">Completed</Radio>
              </Radio.Group>
            </FilterDropdown>
          )}
        />

        <Table.Column dataIndex="dueDate" title="Due Date" />

        <Table.Column
          title="Update"
          render={(_, record) => (
            <Space>
              {isManager ? (
                <Button
                  type="default"
                  onClick={() => navigate(`/work-orders/edit/${record.id}`)}
                >
                  Edit
                </Button>
              ) : (
                record.status !== "COMPLETED" &&
                record.status !== "CANCELED" && (
                  <>
                    <Button
                      type="default"
                      onClick={() =>
                        navigate(`/work-orders/edit/${record.id}`, {
                          state: {
                            nextStatus: nextStatus(record.status),
                          },
                        })
                      }
                    >
                      {nextStatus(record.status).split("_").join(" ")}
                    </Button>
                    {record.status === "IN_PROGRESS" && (
                      <Button
                        type="default"
                        onClick={() =>
                          navigate(`/work-orders/edit/${record.id}`, {
                            state: {
                              nextStatus: "stage",
                            },
                          })
                        }
                      >
                        Update Production Stage
                      </Button>
                    )}
                  </>
                )
              )}
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
