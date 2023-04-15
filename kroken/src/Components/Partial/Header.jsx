import * as React from 'react';
import { AppBar, Box, Menu, MenuItem, IconButton, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return(
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
                    <MenuItem
                        onClick={handleCloseNavMenu}
                        component={NavLink}
                        to="/signin"
                    >
                        <Typography textAlign="center">Signin</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={handleCloseNavMenu}
                        component={NavLink}
                        to="/signup"
                    >
                        <Typography textAlign="center">Signup</Typography>
                    </MenuItem>
                </Menu>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    <span
                        className='mouseOver'
                        onClick={() => navigate("/")}
                    >KROKEN</span>
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button component={NavLink} to="/signin" sx={{ color: '#fff' }}>Signin</Button>
                    <Button component={NavLink} to="/signup" sx={{ color: '#fff' }}>Signup</Button>
                </Box>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    onClick={handleOpenNavMenu}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}