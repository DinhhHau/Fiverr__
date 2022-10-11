// interface JobModel {
//   statusCode: number;
//   content: Content[];
//   dateTime: Date;
// }

// export interface Content {
//   id: number;
//   tenLoaiCongViec: string;
//   dsNhomChiTietLoai: DsNhomChiTietLoai[];
// }

// export interface DsNhomChiTietLoai {
//   id: number;
//   tenNhom: string;
//   hinhAnh: string;
//   maLoaiCongviec: number;
//   dsChiTietLoai: DsChiTietLoai[];
// }

// export interface DsChiTietLoai {
//   id: number;
//   tenChiTiet: string;
// }

interface JobModel {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: DsNhomChiTietLoai[];
}

export interface DsNhomChiTietLoai {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongviec: number;
  dsChiTietLoai: DsChiTietLoai[];
}

export interface DsChiTietLoai {
  id: number;
  tenChiTiet: string;
}

export default JobModel;
