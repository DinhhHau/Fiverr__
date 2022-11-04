import * as React from "react";
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
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { addServiceHireApi } from "../../redux/reducers/adminReducer";
import _ from "lodash";

export default function AddService() {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  const frm = useFormik({
    initialValues: {
      id: 0,
      maCongViec: 0,
      maNguoiThue: 0,
      ngayThue: "",
      hoanThanh: true,
    },
    onSubmit: (values: any) => {
      const payload = values;
      dispatch(addServiceHireApi(payload));
    },
  });

  return (
    <div className="mb-3">
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD Service
      </Button>
      <Dialog
        className="dialog_admin"
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialogTitle_admin">ADD NEW SERVICE</DialogTitle>
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
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <DialogActions className="dialogActions_admin">
              <Button type="submit" className="btn_add">
                Add
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
}
