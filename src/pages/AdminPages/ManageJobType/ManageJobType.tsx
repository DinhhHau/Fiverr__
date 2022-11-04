import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddJobType from "../../../HOC/JobTypeAdmin/AddJobType";
import UpdateJobType from "../../../HOC/JobTypeAdmin/UpdateJobType";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { LoaiCongViec } from "../../../redux/models/JobModel";
import {
  delJobTypeApi,
  delUserApi,
  getJobTypeApi,
  getUserApi,
} from "../../../redux/reducers/adminReducer";

type Props = {};

export default function ManageJobType({}: Props) {
  const { allJobType } = useSelector((state: RootState) => state.adminReducer);
  const refUpdateForm = useRef<any>(null);
  const columns: ColumnsType<LoaiCongViec> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Job Type",
      dataIndex: "tenLoaiCongViec",
      key: "tenLoaiCongViec",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "x",
      render: (value, jobtype) => (
        <div className="d-flex gap-3">
          <UpdateJobType jobtype={jobtype} ref={refUpdateForm} />
          <Button
            type="primary"
            onClick={() => {
              refUpdateForm.current.open();
            }}
          >
            View & Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              const action = delJobTypeApi(jobtype.id);
              dispatch(action);
            }}
          >
            DEL
          </Button>
        </div>
      ),
    },
  ];

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobTypeApi());
  }, []);
  return (
    <>
      <AddJobType />
      <Table columns={columns} dataSource={allJobType} />
    </>
  );
}
