import React, {useState} from 'react';
import "./header.css";
import {NavLink} from "react-router-dom";
import {useTranslation} from 'react-i18next';

const Header = () => {
    const {t, i18n} = useTranslation();

    const [showMenu, setShowMenu] = useState(false);
    const [showLang, setShowLang] = useState(false);

    const handleOpenMenu = () => {
        setShowMenu(!showMenu)
    }

    const handleSwitchLang = (lang) => {
        i18n.changeLanguage(lang);
        setShowLang(false);
        setShowMenu(false);
    }

    return (
        <header>
            <div className='headerLogo'>
                <img src="/media/images/headerLogoWhite.png" alt=""/>
            </div>

            <div className={`burger-wrapper`} onClick={handleOpenMenu}>
                <div className={`burger ${showMenu ? 'active' : ''}`}>
                    <span className="burger-itm burger-itm-top"/>
                    <span className="burger-itm burger-itm-bottom"/>
                </div>
            </div>

            <div className={`headerBody ${showMenu ? 'showMenu' : ''}`}>
                <div className={`links`}>
                    {t("headerLinks").map(itm =>
                        <NavLink key={itm.name + itm.url} to={itm.url}>{itm.name}</NavLink>
                    )}
                </div>
                <div className='lang'>
                    <div className='langActive' onClick={() => setShowLang(!showLang)}>
                        {i18n.language === 'en' ? "ENG" : "RUS"}
                    </div>
                    <div className={`langList ${showLang ? 'showLang' : ''}`}>
                        <div className="langListItem" onClick={() => handleSwitchLang("en")}>
                            ENG
                        </div>
                        <div className="langListItem" onClick={() => handleSwitchLang("ru")}>
                            RUS
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
