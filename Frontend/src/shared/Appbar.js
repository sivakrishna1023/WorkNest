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

export default function Appbar({features=null,subscription=null,links=[]}) {
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
        marginTop: 1,
        marginBottom: 10
      }}
    >
      <Container 
      maxWidth={false}
      sx={{
        px: 0, 
      }}
      >
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
              {features && <>
                <MenuItem
                onClick={() => scrollToSection("features")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" color="text.primary">
                  {features}
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("subscription")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" color="text.primary">
                  {subscription}
                </Typography>
              </MenuItem>
              </>}
            </Box>
            <Box 
            sx={{
              flexGrow:1,
            }}
            ></Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {
                (links && links.length>0) && (
                  links.map((data,index)=>(
                    <MenuItem key={index} sx={{ py: "6px", px: "12px" }}>
                            {data.path ? (
                              <Button
                                variant="body2"
                                style={{ color: "blue", background: "none", padding: "0%" }}
                                href={data.path}
                              >
                                {data.name}
                              </Button>
                            ) : (
                              <Button
                                variant="body2"
                                style={{ color: "blue", background: "none", padding: "0%" }}
                                onClick={data.clickingEvent}
                              >
                                {data.name}
                              </Button>
                            )}
                    </MenuItem>
                  ))
                )
              }
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
                  {features}
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("subscription")}>
                  {subscription}
                </MenuItem>
                <Box
                  sx={{
                    flexGrow: 2,
                  }}
                />
                {
                (links && links.length>0) && (
                  links.map((data,index)=>(
                    <MenuItem key={index} sx={{ py: "6px", px: "12px" }}>
                            {data.path ? (
                              <Button
                                variant="body2"
                                style={{ color: "blue", background: "none", padding: "0%" }}
                                href={data.path}
                              >
                                {data.name}
                              </Button>
                            ) : (
                              <Button
                                variant="body2"
                                style={{ color: "blue", background: "none", padding: "0%" }}
                                onClick={data.clickingEvent}
                              >
                                {data.name}
                              </Button>
                            )}
                    </MenuItem>
                  ))
                )
              }
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
