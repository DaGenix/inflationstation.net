import React from "react";
import style from "./Select.module.scss";

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
    const {
        children,
        ...rest
    } = props;
    return (
        <div className={style.selectWrapper}>
            <select className={style.selectWrapper} {...rest}>
                {children}
            </select>
        </div>
    )
}

export default Select;
