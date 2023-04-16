import * as React from "react";
import AboutApp from "./AboutApp";
import { Button } from '@mui/material';
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import Feedback from "../../Partial/Feedback/Feedback";

const Footer = observer(() => {

    const { ConfigStore } = useStores();

    const year = new Date().getFullYear();

    const handleClickOpen = (scrollType) => () => {
        ConfigStore.setIsAboutShow(true);
        ConfigStore.setScroll(scrollType);
    };

    const openFeed = () => {
        ConfigStore.setIsFeedbackShow(true);
    };

    return(
        <footer>
            <Button onClick={handleClickOpen('paper')}>About App</Button>
            <p className="footer__me">powered by @ViValdy</p>
            <p>All rights reserved © {year}</p>
            <AboutApp />
            <Feedback />
            <Button onClick={openFeed}>Feedback</Button>
        </footer>
    );
});

export default Footer;