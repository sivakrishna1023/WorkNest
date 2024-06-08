import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";

export default function Appbar(props) {
  const deletingadmin=async()=>{
    try{
      const newpromise=await fetch('http://localhost:3000/api/v1/admin/delete',{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    if (!newpromise.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await newpromise.json();
    console.log(data);
    alert('Admin Deleted');
    window.location.href='http://localhost:3001/'
} catch (error) {
  console.error('There has been a problem with your fetch operation:', error);
  alert('Could Not Delete Admin');
}
  }
  const logoStyle = {
    width: "140px",
    height: "auto",
    cursor: "pointer",
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "999px",
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(24px)",
            maxHeight: 40,
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              ml: "-18px",
              px: 0,
            }}
          >
            <a href="/">
              <img
                src={
                  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
            </a>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {props.features && <>
                <MenuItem
                onClick={() => scrollToSection("features")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" color="text.primary">
                  {props.features}
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("subscription")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" color="text.primary">
                  {props.subscription}
                </Typography>
              </MenuItem>
              </>}

              {props.name1 && (
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Button
                    variant="body2"
                    style={{ color: "blue", background: "none", padding: "0%" }}
                    href="/signup"
                  >
                    {props.name1}
                  </Button>
                </MenuItem>
              )}
              {props.name2 && (
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Button
                    variant="body2"
                    style={{ color: "blue", background: "none", padding: "0%" }}
                    href="/signin"
                  >
                    {props.name2}
                  </Button>
                </MenuItem>
              )}
              {props.name3 &&<MenuItem sx={{ py: "6px", px: "12px" }}>
                <Button
                  variant="body2"
                  style={{ color: "blue", background: "none", padding: "0%" }}
                  // onClick={}
                >
                  {props.name3}
                </Button>
              </MenuItem>}
              {props.name4 &&<MenuItem sx={{ py: "6px", px: "12px" }}>
                <Button
                  variant="body2"
                  style={{ color: "blue", background: "none", padding: "0%" }}
                  onClick={deletingadmin}
                >
                  {props.name4}
                </Button>
              </MenuItem>}
              {props.name5 && <MenuItem sx={{ py: "6px", px: "12px" }}>
                <Button
                  variant="body2"
                  style={{ color: "blue", background: "none", padding: "0%" }}
                  href="/"
                >
                  {props.name5}
                </Button>
              </MenuItem>}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
          ></Box>
          <Box sx={{ display: { sm: "", md: "none" } }}>
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: "30px", p: "4px" }}
            >
              <MenuIcon />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: "60dvw",
                  p: 2,
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    flexGrow: 1,
                  }}
                ></Box>
                <MenuItem onClick={() => scrollToSection("features")}>
                  {props.features}
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("subscription")}>
                  {props.subscription}
                </MenuItem>
                {props.name1 && (
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Button
                    variant="body2"
                    style={{ color: "blue", background: "none", padding: "0%" }}
                    href="/signup"
                  >
                    {props.name1}
                  </Button>
                </MenuItem>
              )}
              {props.name2 && (
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Button
                    variant="body2"
                    style={{ color: "blue", background: "none", padding: "0%" }}
                    href="/signin"
                  >
                    {props.name2}
                  </Button>
                </MenuItem>
              )}
              {props.name3 &&<MenuItem sx={{ py: "6px", px: "12px" }}>
                <Button
                  variant="body2"
                  style={{ color: "blue", background: "none", padding: "0%" }}
                  // onClick={}
                >
                  {props.name3}
                </Button>
              </MenuItem>}
              {props.name4 &&<MenuItem sx={{ py: "6px", px: "12px" }}>
                <Button
                  variant="body2"
                  style={{ color: "blue", background: "none", padding: "0%" }}
                  onClick={deletingadmin}
                >
                  {props.name4}
                </Button>
              </MenuItem>}
              {props.name5 && <MenuItem sx={{ py: "6px", px: "12px" }}>
                <Button
                  variant="body2"
                  style={{ color: "blue", background: "none", padding: "0%" }}
                  href="/"
                >
                  {props.name5}
                </Button>
              </MenuItem>}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
