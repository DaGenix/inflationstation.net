"use client";

import {priceAfterInflation} from "../util/data";
import React, {useState} from "react";
import ShowIfJs from "./ShowIfJs";
import style from "./Header.module.scss";
import {DataType, InflationData} from "../util/loadData";

type HeaderProps = {
    data: DataType,
    inflationData: InflationData,
}

export default function Header(props: HeaderProps) {
    const {data, inflationData} = props;
    const [isOpen, setOpen] = useState(false);
    const switchItem = data.data.find(i => i.names[0] === "Nintendo Switch");
    if (!switchItem) {
        throw new Error("Couldn't find item for Switch");
    }
    const switchYear = switchItem.release_year_month.year;
    const origSwitchPrice = switchItem.orig_prices[0];
    const todaysSwitchPrice = priceAfterInflation(inflationData, switchItem, data.inflation_year_month)[0];
    const switchDiscount = (todaysSwitchPrice - origSwitchPrice).toLocaleString();
    return (
        <header className={style.headerArea}>
            <h1>Console Prices Adjusted for Inflation</h1>
            {
                isOpen &&
                <p className={style.textArea}>
                    Original launch prices have been adjusted for inflation since the consoles
                    were initially released. Some consoles are still available at the same price
                    they were released at. However, due to inflation, if these consoles were released
                    today at the same relative cost, they would be more expensive. For example, the
                    Switch was released in {switchYear} for ${origSwitchPrice.toLocaleString()}.
                    Due to inflation, ${origSwitchPrice.toLocaleString()} of goods in {switchYear} would now
                    cost ${todaysSwitchPrice.toLocaleString()}.&nbsp;
                    <button className={style.expand}
                        onClick={(e) => {
                            setOpen(false);
                        }}
                    >
                        Less
                    </button>
                </p>
            }
            {
                !isOpen &&
                <p className={style.textArea}>
                    Original launch prices have been adjusted for inflation
                    <ShowIfJs component="span">
                        ...&nbsp;
                        <button className={style.expand}
                            onClick={(e) => {
                                setOpen(true);
                            }}
                        >
                            More
                        </button>
                    </ShowIfJs>
                </p>
            }
        </header>
    );
};
