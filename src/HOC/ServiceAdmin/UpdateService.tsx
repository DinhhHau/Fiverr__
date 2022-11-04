import * as React from "react";
import { forwardRef, useImperativeHandle, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { updateServiceHireApi } from "../../redux/reducers/adminReducer";
import _ from "lodash";
import { ThueCongViec } from "../../redux/models/JobModel";

type Props = {
  service: ThueCongViec;
};

const UpdateService = ({ service }: Props, ref) => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  const frm = useFormik({
    initialValues: {
      id: service.id,
      maCongViec: service.maCongViec,
      maNguoiThue: service.maNguoiThue,
      ngayThue: service.ngayThue,
      hoanThanh: service.hoanThanh,
    },
    onSubmit: (values: any) => {
      const payload = values;
      dispatch(updateServiceHireApi(service.id, payload));
      setOpen(false);
    },
  });
  useImperativeHandle(ref, () => ({
    open: (data?) => {
      console.log(data);
      setOpen(true);
    },
    close: () => setOpen(false),
  }));

  return (
    <div className="mb-3">
      <Dialog
        className="dialog_admin"
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialogTitle_admin"> UPDATE SERVICE</DialogTitle>
        <DialogContent className="dialogContent_admin">
          <form className="form" onSubmit={frm.handleSubmit}>
            <Grid spacing={1} container mt={1}>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  color="success"
                  fullWidth
                  disabled
                  id="id"
                  name="id"
                  type="text"
                  label="ID"
                  value={frm.values.id}
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  color="success"
                  fullWidth
                  name="maCongViec"
                  type="text"
                  value={frm.values.maCongViec}
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                  label="Job ID"
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  color="success"
                  fullWidth
                  name="maNguoiThue"
                  type="text"
                  value={frm.values.maNguoiThue}
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                  label="Hirer ID"
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  color="success"
                  fullWidth
                  name="ngayThue"
                  type="text"
                  value={frm.values.ngayThue}
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                  label="Hire Date"
                />
              </Grid>
              <Grid item xs={12} md={12} mt={1}>
                <FormControl>
                  <FormLabel
                    color="success"
                    id="demo-row-radio-buttons-group-label"
                  >
                    Condition
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="hoanThanh"
                    onChange={frm.handleChange}
                  >
                    {service.hoanThanh ? (
                      <>
                        <FormControlLabel
                          value={true}
                          control={<Radio color="success" />}
                          label="Complete"
                          name="hoanThanh"
                        />
                        <FormControlLabel
                          color="success"
                          value={false}
                          control={<Radio color="success" />}
                          label="Incomplete"
                          name="hoanThanh"
                        />
                      </>
                    ) : (
                      <>
                        <FormControlLabel
                          value={true}
                          control={<Radio color="success" />}
                          label="Complete"
                          name="hoanThanh"
                        />
                        <FormControlLabel
                          color="success"
                          value={false}
                          control={<Radio color="success" />}
                          label="Incomplete"
                          name="hoanThanh"
                          defaultChecked
                        />
                      </>
                    )}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <DialogActions className="dialogActions_admin">
              <Button type="submit" className="btn_add">
                Save
              </Button>
              <Button onClick={handleClose} autoFocus className="btn_cancel">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default forwardRef(UpdateService);
