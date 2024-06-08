import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
export default function Updateadmin() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    company: "",
  });

  const AddRoleButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#115293",
    },
  }));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async() => {
    const newobj={
        password:formData.password,
        company:formData.company
    }
    try{
        const newpromise=await fetch('http://localhost:3000/api/v1/admin/update',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization':localStorage.getItem('token')
        },
        body: JSON.stringify(newobj)
      })
      if (!newpromise.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await newpromise.json();
      console.log(data);
      alert('Updated Admin Account');
      window.location.href='http://localhost:3001/admin'
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    alert('Could  Not Update Admin Account');
  }
    handleClose();
  };
  return (
    <div>
      <Button
        variant="body2"
        style={{ color: "blue", background: "none", padding: "0%" }}
        onClick={handleClickOpen}
      >
        Update Account
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Grid container style={{ display: "flex" }}>
          <Grid item xs={11}>
            <DialogTitle>Update Admin Account</DialogTitle>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              xs={2}
              style={{ alignContent: "end" }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="company"
                  label="Company"
                  fullWidth
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <AddRoleButton
            onClick={() => {
              handleSubmit();
            }}
          >
            Update Admin Account
          </AddRoleButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
