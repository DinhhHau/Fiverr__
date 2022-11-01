import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserUpdate from "../../../HOC/UserUpdate/UserUpdate";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { deleteApi, getUserApi } from "../../../redux/reducers/adminReducer";
import { http } from "../../../util/setting";

interface DataType {
  key: string | number;
  id: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanhThanh: boolean;
}

type Props = {};

export default function ManageService({}: Props) {
  const [allService, setAllService] = useState<any>([]);

  const refUpdate = useRef<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Job ID",
      dataIndex: "maCongViec",
      key: "maCongViec",
    },
    {
      title: "Hirer ID",
      dataIndex: "maNguoiThue",
      key: "maNguoiThue",
    },
    {
      title: "Hire Day",
      key: "ngayThue",
      dataIndex: "ngayThue",
    },
    {
      title: "Condition",
      key: "hoanThanh",
      dataIndex: "hoanThanh",
      render: (conditon) => {
        if (conditon) {
          return <p className="m-0">Hoàn thành</p>;
        }
        return <p className="m-0">Chưa hoàn thành</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "x",
      render: (value, service) => (
        <div className="d-flex gap-3">
          <Button>Xem thông tin chi tiết</Button>
          <UserUpdate ref={refUpdate} />
          <Button
            onClick={() => {
              refUpdate.current.open();
            }}
            type="primary"
          >
            Sửa
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              console.log(value);
              const action = deleteApi("/thue-cong-viec/", service.id);
              dispatch(action);
            }}
          >
            DEL
          </Button>
        </div>
      ),
    },
  ];
  const fetchApi = async () => {
    try {
      const result = await http.get(`/thue-cong-viec`);
      setAllService(result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return <Table columns={columns} dataSource={allService} />;
}
