import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { getAllCongViecApi } from "../../../redux/reducers/jobReducer";

type Props = {};

interface DataType {
  id: number;
  tenCongViec: string;
  danhGia: number;
  giaTien: number;
  nguoiTao: number;
  hinhAnh: string;
  moTa: string;
  maChiTietLoaiCongViec: number;
  moTaNgan: string;
  saoCongViec: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "tenCongViec",
    key: "tenCongViec",
    width: 200,
    render: (text) => <p className="mt-0">{text}</p>,
  },
  {
    title: "Image",
    dataIndex: "hinhAnh",
    key: "hinhAnh",
    render: (url) => <img src={url} width="70px" height="70px" alt="..." />,
  },
  {
    title: "Mô Tả",
    dataIndex: "moTaNgan",
    key: "moTaNgan",
  },
  {
    title: "Đánh Giá",
    dataIndex: "danhGia",
    key: "danhGia",
  },
  {
    title: "Giá Tiền",
    dataIndex: "giaTien",
    key: "giaTien",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "x",
    render: (_, { id }) => (
      <div className="d-flex gap-3">
        {/* <User ref={refUserDialog} id={id} /> */}
        <Button onClick={() => {}}>Xem thông tin & Sửa</Button>
        <Button type="primary" danger onClick={() => {}}>
          DEL
        </Button>
      </div>
    ),
  },
];

export default function ManageJob({}: Props) {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCongViecApi());
  }, []);
  const { allCongViec } = useSelector((state: RootState) => state.jobReducer);
  // console.log(allCongViec);

  return <Table columns={columns} dataSource={allCongViec} />;
}
