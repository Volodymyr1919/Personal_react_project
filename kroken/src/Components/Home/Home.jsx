import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import homeStyle from "./home.scss";

export default function Home() {

    return(
        <div className='home'>
            <AppBar component="nav">
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
                        KROKEN
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button component={NavLink} to="/signin" sx={{ color: '#fff' }}>Signin</Button>
                        <Button component={NavLink} to="/signup" sx={{ color: '#fff' }}>Signup</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <p>
                Dear visitor, <br /><br /> do you know already the web application Kroken? If not, let us introduce it. We developed the application to help visitors to discover new features from lovely locations like restaurants, heairdress houses and etc. Apart from that visitors can get some bonuses and spend it in these places. Owners can propmote their business by introducing some customer loyalty programs. <br /><br /> The application has two login types: <br /> - Owner of a business <br /> - Vistor. <br /><br /> If You are owner of business - just regisrty as owner by clicking 'Sign Up' button above, enter name, type of Your perfect business and other fields, then complete registration and after opening Your personal page you can easyly add offer, by filling required fields. Then You will get 3 QR-codes: <br /> 1) Put on free and accessible spaces for visitors - they will regisrty <br /> 2) This should be given to client only after payments, that they can get bonuses on thems accounts. <br /> 3) This one required for withdrow bonuses. <br /><br /> If You are visitor Your choice is visitors registration, also easy - just complete form and then You will transfer on Your personal page, where You can find which offers are existing, how many bonuses you need, to get a gift and what kind of gift You can get. Once You will realase that you've done condition to get bonus - ask for QR-code, scan it and press button 'Submit', You will reseive bonus in few moments. Once You will reach time for spending bonuses - ask for required QR-code, scan it and You will transfer on page where You enter count of bonuses for withdrow and press confirm button.
            </p>
        </div>
    );
}