import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Input, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { registerAdminApi } from "../../redux/reducers/adminReducer";
import { toast } from "react-toastify";
import _ from "lodash";
import { updateAvatar } from "../../redux/reducers/userReducer";

export default function AddJob() {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  const form = useFormik({
    initialValues: {
      tenCongViec: "",
      danhGia: "",
      giaTien: "",
      hinhAnh: "",
      moTa: "",
      maChiTietLoaiCongViec: "",
      moTaNgan: "",
      saoCongViec: "",
    },
    onSubmit: (values) => {
      console.log(values);
      //   const payload = values;
      //   dispatch(registerAdminApi(payload))
      //     .then((res) => {
      //       handleClose();
      //     })
      //     .catch((err) => {});
    },
  });

  return (
    <div className="mb-3">
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm Công Việc
      </Button>
      <Dialog
        className="dialog_admin"
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialogTitle_admin">THÊM CÔNG VIỆC</DialogTitle>
        <DialogContent className="dialogContent_admin">
          <form className="form" onSubmit={form.handleSubmit}>
            <Grid spacing={1} container mt={1}>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="tenCongViec"
                  name="tenCongViec"
                  type="text"
                  label="Tên công việc"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Grid>

              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="danhGia"
                  name="danhGia"
                  type="text"
                  label="Đánh giá"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="giaTien"
                  name="giaTien"
                  type="text"
                  label="Giá tiền"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="hinhAnh"
                  name="hinhAnh"
                  type="text"
                  label="Image"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="moTa"
                  name="moTa"
                  type="text"
                  label="Mô tả"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="moTaNgan"
                  name="moTaNgan"
                  type="text"
                  label="Mô tả ngắn"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="maChiTietLoaiCongViec"
                  name="maChiTietLoaiCongViec"
                  type="text"
                  label="Mã chi tiết"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="saoCongViec"
                  name="saoCongViec"
                  type="text"
                  label="Sao công việc"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Grid>
            </Grid>
            <DialogActions className="dialogActions_admin">
              <Button type="submit" className="btn_add">
                Thêm
              </Button>
              <Button onClick={handleClose} autoFocus className="btn_cancel">
                Huỷ
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
