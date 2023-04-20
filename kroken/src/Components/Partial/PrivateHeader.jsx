import * as React from 'react';
import { AppBar, Box, Menu, MenuItem, IconButton, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Confirmation from './Confirmation/Confirmation';
import { observer } from 'mobx-react';
import { useStores } from '../Stores/MainStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const PrivateHeader = observer(() => {

    const { ConfigStore } = useStores();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElGlobe, setAnchorElGlobe] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenGlobeMenu = (event) => {
        setAnchorElGlobe(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseGlobeMenu = () => {
        setAnchorElGlobe(null);
    };

    const openFeed = () => {
        handleCloseNavMenu();
        ConfigStore.setIsFeedbackShow(true);
    };

    const logout = () => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            ConfigStore.setStateConfirmation("logout");
        })
        .then(() => {
            ConfigStore.setHeaderConfirmation("Are you sure, want to exit?");
        })
        .then(() => {
            ConfigStore.setTextConfirmation("You can back at any time!");
        })
        .then(() => {
            ConfigStore.setIsConfirmShow(true);
        })
    };

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
                        <MenuItem onClick={openFeed} >
                            <Typography textAlign="center">Feedback</Typography>
                        </MenuItem>
                        <MenuItem onClick={logout} >
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElGlobe}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElGlobe)}
                        onClose={handleCloseGlobeMenu}
                        >
                        <MenuItem>
                            <Typography textAlign="center">EN</Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography textAlign="center">DE</Typography>
                        </MenuItem>
                    </Menu>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <span>KROKEN</span>
                    </Typography>
                    <Button sx={{ color: '#fff' }} onClick={handleOpenGlobeMenu}><FontAwesomeIcon icon={faGlobe}/></Button>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button
                            onClick={openFeed}
                            sx={{ color: '#fff' }}
                        >
                            Feedback
                        </Button>
                        <Button
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
            <Confirmation /> 
        </>
    );
});

export default PrivateHeader;