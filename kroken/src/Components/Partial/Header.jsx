import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();

    return(
        <AppBar component="nav" style={{background: "#4C0013"}}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
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
            </Toolbar>
        </AppBar>
    );
}