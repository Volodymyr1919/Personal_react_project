import * as React from 'react';
import homeStyle from "./home.scss";

export default function Home() {

    return(
        <div className='home'>
            <p>
                Dear visitor, <br /><br /> do you know already the web application Kroken? If not, let us introduce it. We developed the application to help visitors to discover new features from lovely locations like restaurants, heairdress houses and etc. Apart from that visitors can get some bonuses and spend it in these places. Owners can propmote their business by introducing some customer loyalty programs. <br /><br /> The application has two login types: <br /> - Owner of a business <br /> - Vistor. <br /><br /> If You are owner of business - just regisrty as owner by clicking 'Sign Up' button above, enter name, type of Your perfect business and other fields, then complete registration and after opening Your personal page you can easyly add offer, by filling required fields. Then You will get 3 QR-codes: <br /> 1) Put on free and accessible spaces for visitors - they will regisrty <br /> 2) This should be given to client only after payments, that they can get bonuses on thems accounts. <br /> 3) This one required for withdrow bonuses. <br /><br /> If You are visitor Your choice is visitors registration, also easy - just complete form and then You will transfer on Your personal page, where You can find which offers are existing, how many bonuses you need, to get a gift and what kind of gift You can get. Once You will realase that you've done condition to get bonus - ask for QR-code, scan it and press button 'Submit', You will reseive bonus in few moments. Once You will reach time for spending bonuses - ask for required QR-code, scan it and You will transfer on page where You enter count of bonuses for withdrow and press confirm button.
            </p>
            <div className="home__bg"></div>
        </div>
    );
}