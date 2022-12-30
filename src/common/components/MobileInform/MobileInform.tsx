import React from 'react';
import s from './MobileInform.module.scss'

const MobileInform = () => {
    return (
        <div className={s.mobileInformBlock}>
            <div className={s.inform}>
                <span> This site is not adapted for mobile devices and screens with a resolution already 1200px.</span>
                <span> Please, for further viewing, open this site from your computer.</span>
            </div>
        </div>
    );
};

export default MobileInform;