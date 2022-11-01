import { useTheme } from "@mui/material/styles";
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Autocomplete,
  Chip,
} from "@mui/material";
import {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  Component,
} from "react";
import { AppDispatch, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Modal = (props, ref) => {
  const dispatch: AppDispatch = useDispatch();

  const { Component } = useSelector((state: RootState) => state.modalReducer);

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //
  useImperativeHandle(ref, () => ({
    open: (data?) => {
      setOpen(true);
    },
    close: () => setOpen(false),
  }));
  //
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //

  return (
    <Dialog
      className="dialog"
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle className="dialogTitle" id="responsive-dialog-title">
        Job Type
      </DialogTitle>
      <DialogContent className="dialogContent">
        {Component}
      </DialogContent>
    </Dialog>
  );
};

export default forwardRef(Modal);
