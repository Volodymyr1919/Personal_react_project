import * as React from 'react';
import { AppBar, Box, Menu, MenuItem, IconButton, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function PrivateHeader() {

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logout = () => {
        if(window.confirm("Are you sure, want to exit?")) {
            handleCloseNavMenu();
            localStorage.clear();
            navigate("/signin");
        } else {
            return;
        }
    }

    return(
        <>
            <AppBar component="nav" style={{background: "#4C0013"}}>
                <Toolbar>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: "block", md: "none" },
                        }}
                        >
                        <MenuItem onClick={logout} >
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <span>KROKEN</span>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button
                            // component={NavLink}
                            // to="/signin"
                            onClick={logout}
                            sx={{ color: '#fff' }}
                        >
                            Logout
                        </Button>
                    </Box>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ display: { sm: 'none' } }}
                        onClick={handleOpenNavMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>   
        </>
    );
}