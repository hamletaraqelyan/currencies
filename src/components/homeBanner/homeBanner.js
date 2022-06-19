import React from 'react';
import "./homeBanner.css";
import Exchange from "../exchange/exchange"
import { useTranslation } from 'react-i18next';

const HomeBanner = () => {
    const { t } = useTranslation();
    return (
        <div className='homeBanner centerFlexBox'>
            <div className='homeBannerInfo'>
                <h1 className='fw-200'>{t('pageTitle')}</h1>
                <h4 className='fw-100'>{t('lorem')}</h4>
                <h4 className='fw-100'>{t('lorem')}</h4>
            </div>
            <Exchange/>
        </div>
    );
};

export default HomeBanner;
