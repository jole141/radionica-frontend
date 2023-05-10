import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ExtensionIcon from "@mui/icons-material/Extension";

const TABS: { title: string; icon: any }[] = [
  { title: "Dijelovi", icon: <ExtensionIcon /> },
  // { title: "Strojevi", icon: <PrecisionManufacturingIcon /> },
  // { title: "Alati", icon: <HomeRepairServiceIcon /> },
  { title: "Projekti", icon: <AccountTreeIcon /> },
];

export default function SideNav({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string | undefined;
  setSelectedTab: React.Dispatch<React.SetStateAction<any>>;
}) {
  const list = (
    <Box>
      <List>
        {TABS.map((tab, key) => (
          <ListItem
            disablePadding
            sx={selectedTab === tab.title && { background: "#d2d2d2" }}
            onClick={() => setSelectedTab(tab.title)}
          >
            <ListItemButton>
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <ListItemText primary={tab.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div
      style={{
        background: "white",
        margin: 0,
        padding: 0,
        position: "fixed",
        width: "20rem",
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
