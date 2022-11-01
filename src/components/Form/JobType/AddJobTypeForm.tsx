import {
    Autocomplete,
    Button,
    DialogActions,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
  } from "@mui/material";
  import { useFormik } from "formik";
  import React, { useImperativeHandle, useState } from "react";
  import { useDispatch } from "react-redux";
  import { toast } from "react-toastify";
  import { AppDispatch } from "../../../redux/configStore";
  import { addApi, updateApi } from "../../../redux/reducers/adminReducer";
  
  type Props = {
   
  };
  
  export default function AddJobTypeForm({  }: Props, ref) {
    const [open, setOpen] = useState(false);
  
    const dispatch: AppDispatch = useDispatch();
    const handleClose = () => {
      setOpen(false);
    };
    const frm = useFormik({
      initialValues: {
        id: 0,
        tenLoaiCongViec: "",
      },
      onSubmit: (values: any) => {
        const payload = values;
        console.log(payload);
        dispatch(addApi("/loai-cong-viec", payload))
          .then((res) => {
            handleClose();
          })
          .catch((err) => {});
      },
    });
  
    return (
      <form className="form" onSubmit={frm.handleSubmit}>
        <Grid spacing={1} container mt={1}>
          <Grid item xs={12} md={6} mt={1}>
            <TextField
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
              fullWidth
              name="tenLoaiCongViec"
              type="text"
              value={frm.values.tenLoaiCongViec}
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
              label="JobType"
            />
          </Grid>
        </Grid>
  
        <DialogActions className="dialogActions">
          <Button onClick={handleClose} autoFocus className="btn_cancel">
            Cancel
          </Button>
          <Button type="submit" autoFocus className="btn_save">
            Add 
          </Button>
        </DialogActions>
      </form>
    );
  }
  