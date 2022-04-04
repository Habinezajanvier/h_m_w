import React from 'react'
import "../assets/styles/components/button.scss";


const Button = ({ title, onClick, outlined }) => {
    return (
        <div className={`button ${outlined ? "" : "button-bg"}`} onClick={() => onClick && onClick()}>
            {title}
        </div>
    )
}

export default Button;
