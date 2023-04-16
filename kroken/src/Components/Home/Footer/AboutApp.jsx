import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import { useStores } from '../../Stores/MainStore';
import { NavLink } from 'react-router-dom';

const AboutApp = observer(() => {

    const { ConfigStore } = useStores();

    const handleClose = () => {
        ConfigStore.setIsAboutShow(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
    if (ConfigStore.isAboutShow) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
        descriptionElement.focus();
        }
    }
    }, [ConfigStore]);

    return (
        <Dialog
            open={ConfigStore.isAboutShow}
            onClose={handleClose}
            scroll={ConfigStore.scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            className='homeAbout'
        >
        <DialogTitle id="scroll-dialog-title">About</DialogTitle>
        <DialogContent dividers={ConfigStore.scroll === 'paper'}>
            <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
            >
                Dear visitor,
                <br /><br />
                Have you heard about the web application Kroken? If not, let us introduce it to you. We developed this application to help visitors discover new features from lovely locations such as restaurants, hairdressing salons, and more. In addition to this, visitors can earn bonuses and spend them in these places. Business owners can also promote their business by introducing customer loyalty programs.
                <br /><br />
                The application has two login types:
                <br />
                - Visitor<br />
                - Owner of a business<br />
                <br /><br />
                For visitor: <br /> simply complete the registration form, and you will be directed to your personal page where you can find all the existing offers, the number of bonuses required to get a gift, and the kind of gift you can get. Once you meet the required condition to get a bonus, ask for a QR code, scan it, and press the 'Submit' button. You will receive your bonus in just a few moments. Once you have earned enough bonuses, you can spend them by asking for the required QR code, scanning it, entering the number of bonuses you want to withdraw, and pressing the confirm button.
                <br /><br />
                For business: <br /> simply register by clicking the 'Sign Up' button above. Enter the name of your business, the type of business you have, and other required fields. Once you complete the registration, you can easily add offers by filling in the required fields. Then, you will receive three QR codes:
                <br />
                1. Place the first QR code in free and accessible spaces for visitors to register.<br />
                2. Give the second QR code to your customers only after payment, so that they can earn bonuses on their account.<br />
                3. Use the third QR code for bonus withdrawals.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Got it</Button>
            <Button component={NavLink} to="/signup">Get started</Button>
        </DialogActions>
        </Dialog>
    );
});

export default AboutApp;