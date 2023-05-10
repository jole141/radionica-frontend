import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ExtensionIcon from "@mui/icons-material/Extension";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StyleIcon from "@mui/icons-material/Style";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

const TABS: { title: string; icon: any }[] = [
  { title: "Dijelovi", icon: <ExtensionIcon /> },
  { title: "Strojevi", icon: <PrecisionManufacturingIcon /> },
  { title: "Alati", icon: <HomeRepairServiceIcon /> },
  { title: "Projekti", icon: <AccountTreeIcon /> },
  { title: "Zarada", icon: <AttachMoneyIcon /> },
  { title: "Troškovi", icon: <MoneyOffIcon /> },
  { title: "Dnevni promet", icon: <DateRangeIcon /> },
  { title: "Narudžbe", icon: <ListAltIcon /> },
];

export default function SideNav({
  setLogin,
}: {
  setLogin: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const list = (
    <Box>
      <List>
        {TABS.map((tab, key) => (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <ListItemText primary={tab.title} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ background: "#ffaeae" }}>
          <ListItemButton
            onClick={() => {
              setLogin("0");
              localStorage.setItem("login", "0");
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Odjavi se" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div
      style={{
        background: "white",
        margin: 0,
        padding: 0,
        height: "100vh",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          padding: "1rem",
          background: "#e9f3ff",
        }}
      >
        RADIONICA
      </div>
      {list}
    </div>
  );
}
