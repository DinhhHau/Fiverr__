import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { registerAdminApi } from "../../redux/reducers/adminReducer";
import { toast } from "react-toastify";

export default function AddAdmin() {
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
      email: "",
      name: "",
      password: "",
      phone: "",
      role: "ADMIN",
    },
    onSubmit: (values) => {
      // console.log(values);
      const payload = values;
      dispatch(registerAdminApi(payload))
        .then((res) => {
          handleClose();
        })
        .catch((err) => {});
    },
  });

  return (
    <div className="mb-3">
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Admin
      </Button>
      <Dialog
        className="dialog_admin"
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialogTitle_admin">ADD NEW ADMIN</DialogTitle>
        <DialogContent className="dialogContent_admin">
          <form className="form" onSubmit={form.handleSubmit}>
            <Grid spacing={1} container mt={1}>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Grid>

              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  type="text"
                  label=" Password"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  type="text"
                  label="Phone"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
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
}
