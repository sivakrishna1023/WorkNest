import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { domain, server } from "../../constants/config";
import { Toaster,toast } from "react-hot-toast";
import ProfilePage from "../../shared/profile";


const AdminProfile = ()=>{
  const [open, setOpen] = useState(false);
  const [isLoading,setIsLoading]=useState(false);
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
    setIsLoading(true);
    const toastId=toast.loading("Updating details...");
    try{
        const newpromise=await fetch(`${server}/api/v1/admin/update`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization':`bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newobj)
          })
          if (!newpromise.ok) {
            setIsLoading(false);
            throw new Error('Network response was not ok');
          }
          const data = await newpromise.json();
            if(data.success){
              toast.success("Updated successfully...!",{id:toastId})
            }else{
              toast.error("Failed to update",{id:toastId});
            }
          } catch (error) {
            toast.error("Failed to update",{id:toastId});
          }finally{
            setIsLoading(false);
          }
    handleClose();
  };

  return (
   <ProfilePage></ProfilePage>
  );
}

export default AdminProfile