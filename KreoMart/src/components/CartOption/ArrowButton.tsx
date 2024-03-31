import React from "react";
// import styles from "./ArrowButton.module.css";
import Image from "next/image";
import Arrowbtn from '../../../public/assets/ArrowRight.png';

const Button: React.FC = ()=> {
  return (
    <button>
      <Image src={Arrowbtn} alt="Arrow Right" />
    </button>
  );
};

export default Button;
