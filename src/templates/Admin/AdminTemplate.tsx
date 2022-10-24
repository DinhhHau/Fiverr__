import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getUserApi } from "../../redux/reducers/adminReducer";

interface DataType {
  key: string;
  name: string;
  id: number;
  phone: string;
  gender: boolean;
  role: string;
  skill: [];
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Phone",
    key: "phone",
    dataIndex: "phone",
  },
  {
    title: "Role",
    key: "role",
    dataIndex: "role",
  },
  {
    title: "Skill",
    key: "skill",
    dataIndex: "skill",
    render: (_, { skill }) => (
      <div>
        {skill.map((tag) => {
          return <Tag key={tag}>{tag}</Tag>;
        })}
      </div>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "x",
    render: () => (
      <div className="d-flex gap-3">
        <Button>Xem thông tin chi tiết</Button>
        <Button type="primary">Sửa</Button>
        <Button type="primary" danger>
          DEL
        </Button>
      </div>
    ),
  },
];

const AdminTemplate: React.FC = () => {
  const { allUser } = useSelector((state: RootState) => state.adminReducer);
  console.log(allUser);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserApi());
  }, []);
  return <Table columns={columns} dataSource={allUser} />;
};

export default AdminTemplate;
