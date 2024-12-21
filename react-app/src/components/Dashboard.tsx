import React, { useState } from "react";
import {
    AppBar,
    Box,
    Container,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import {
    Assessment as ReportIcon,
    Assignment as ProjectIcon,
    Group as ResourceIcon,
    Menu as MenuIcon,
    People as ClientIcon
} from "@mui/icons-material";
import ResourceManagement from "./ResourceManagement";
import TechnologyReport from "./TechnologyReport";
import MaintenanceProjectReport from "./MaintenanceProjectReport";
import RevenueDetails from "./RevenueDetails";
import ClientManagement from "./ClientManagement";
import { createAuthenticatedAxios } from "../utils/api";

const httpClient = createAuthenticatedAxios();
const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("resources");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const menuItems = [
        {
            id: "resources",
            text: "Resource Management",
            icon: <ResourceIcon />,
        },
        {
            id: "technology",
            text: "Technology Distribution",
            icon: <ProjectIcon />,
        },
        {
            id: "maintenance",
            text: "Maintenance Projects",
            icon: <ProjectIcon />,
        },
        { id: "revenue", 
            text: "Revenue Analysis",
             icon: <ReportIcon />
             },
             { id: "client", 
            text: "Client Management",
             icon: <ClientIcon />
             },
             
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        HR Management System
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.id}
                            onClick={() => {
                                setActiveSection(item.id);
                                setDrawerOpen(false);
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Container>
                    {activeSection === "resources" && <ResourceManagement />}
                    {activeSection === "technology" && <TechnologyReport />}
                    {activeSection === "maintenance" && (
                        <MaintenanceProjectReport />
                    )}
                    {activeSection === "revenue" && <RevenueDetails />}
                    {activeSection === "client" && <ClientManagement />}
                </Container>
            </Box>
        </Box>
    );
};

export default Dashboard;
