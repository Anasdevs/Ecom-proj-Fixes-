import React from 'react';
import styles from './Button.module.css';

function Button() {
    return (
        <button className={styles.btn}>
            Shop Now <span> <img src='/assets/arrow-right.svg'/> </span>
        </button>
    );
}

export default Button;