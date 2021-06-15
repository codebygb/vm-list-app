import {
  Backdrop,
  Button,
  CircularProgress,
  div,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { supabase } from "./supabase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function NewVM() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("Successful");

  const handleClose = () => {
    setOpen(false);
  };

  const [dataVM, setDataVM] = useState({
    client: "",
    name: "",
    expdate: "2021-06-15",
    reqdate: "2021-06-15",
    requestor: "Go",
  });

  async function addNewVM() {
    try {
      setLoading(true);

      let { error } = await supabase.from("vms").insert([dataVM], {
        returning: "minimal", // Don't return the value after inserting
      });
      setLoading(false);
      setOpen(true);
      if (error) {
        throw error;
      } else {
        setMsg("Saved Successfully");
      }
    } catch (error) {
      setMsg(error.message);
    }
  }

  return (
    <div className="data-container-form">
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Status of the operation was"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div className="newVMForm">
        <div item className="input">
          <TextField
            fullWidth
            id="VM"
            label="VM Name"
            variant="outlined"
            onChange={(e) =>
              setDataVM((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
        </div>
        <div item className="input">
          <TextField
            fullWidth
            id="Client"
            label="Client"
            variant="outlined"
            onChange={(e) =>
              setDataVM((prev) => {
                return { ...prev, client: e.target.value };
              })
            }
          />
        </div>
        <div item className="input">
          <TextField
            fullWidth
            id="Requestor"
            label="Requestor"
            variant="outlined"
            onChange={(e) =>
              setDataVM((prev) => {
                return { ...prev, requestor: e.target.value };
              })
            }
          />
        </div>
        <div item className="input">
          <TextField
            id="date"
            fullWidth
            label="ReqDate"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setDataVM((prev) => {
                return { ...prev, reqdate: e.target.value };
              });
            }}
          />
        </div>
        <div item className="input">
          <TextField
            fullWidth
            id="date"
            label="ExpiryDate"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setDataVM((prev) => {
                return { ...prev, expdate: e.target.value };
              });
            }}
          />
        </div>
        <div>
          <Button variant="outlined" onClick={() => addNewVM()}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
