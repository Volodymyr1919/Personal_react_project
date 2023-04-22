import * as React from 'react';
import Footer from './Footer/Footer';
import { Button } from '@mui/material';
import { observer } from "mobx-react";
import { useStores } from '../Stores/MainStore';
import { NavLink } from 'react-router-dom';
import Snack from '../Partial/Snack';
// eslint-disable-next-line no-unused-vars
import homeStyle from "./home.scss";

const Home = observer(() => {

    const { ConfigStore } = useStores();

    const handleClickOpen = (scrollType) => () => {
        ConfigStore.setIsAboutShow(true);
        ConfigStore.setScroll(scrollType);
    };

    React.useEffect(() => {
        console.log(ConfigStore.lang);
    }, [ConfigStore.lang])

    return(
        <>
            <div className='home'>
                <div className='home__about'>
                    <p className='about__title'>Motivation beyond, bonuses within!</p>
                    <p className='about__users'>For customers: <br /> We introduce a loyalty app that helps you get more out of your purchases - earn bonuses and receive exclusive offers from companies within our app.</p>
                    <p className='about__users'>For business: <br /> Our loyalty app brings together companies and employees - you can register, add and remove offers, and track how many bonuses your visitors have earned.</p>
                    <div>
                        <Button onClick={handleClickOpen('paper')}>Learn More</Button>
                        <Button component={NavLink} to="/signup">Get started</Button>
                    </div>
                </div>
                <div className="home__bg"></div>
            </div>
            <Footer />
            <Snack />
        </>
    );
});

export default Home;