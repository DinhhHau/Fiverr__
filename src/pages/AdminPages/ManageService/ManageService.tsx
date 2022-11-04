import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddService from "../../../HOC/ServiceAdmin/AddService";
import UpdateService from "../../../HOC/ServiceAdmin/UpdateService";
import UserUpdate from "../../../HOC/UserUpdate/UserUpdate";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { ThueCongViec } from "../../../redux/models/JobModel";
import {
  delServiceHireApi,
  getServiceHireApi,
  getUserApi,
} from "../../../redux/reducers/adminReducer";

type Props = {};

export default function ManageService({}: Props) {
  const { allServiceHire } = useSelector(
    (state: RootState) => state.adminReducer
  );
  const refUpdateForm = useRef<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const columns: ColumnsType<ThueCongViec> = [
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
          <UpdateService service={service} ref={refUpdateForm} />
          <Button
            onClick={() => {
              refUpdateForm.current.open();
            }}
            type="primary"
          >
            View & Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              const action = delServiceHireApi(service.id);
              dispatch(action);
            }}
          >
            DEL
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getServiceHireApi());
  }, []);

  return (
    <>
      <AddService />
      <Table columns={columns} dataSource={allServiceHire} />
    </>
  );
}
