export interface DangNhapView {
  email: string;
  password: string;
}

export interface ThongTinNguoiDung {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
}

export interface ThongTinNguoiDung1 {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
}
