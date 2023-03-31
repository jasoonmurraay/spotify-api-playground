import React from 'react';
import classes from './Loading.module.css'

const Loading = () => {
    return (
        <div className={`${classes.loading}`}>
            <span className={`${classes.loadingDot}`}></span>
            <span className={`${classes.loadingDot}`}></span>
            <span className={`${classes.loadingDot}`}></span>
        </div>
    );
};

export default Loading;
