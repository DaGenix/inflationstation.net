import {priceAfterInflation} from "../util/data";
import React, {CSSProperties} from "react";
import {greaterThanOrEqual, YearMonth} from "../util/yearMonth";
import {useData} from "../util/useData";
import {DataItemType} from "../util/loadData";
import style from "./ConsoleCard.module.scss";

type ConsoleCardInnerProps = {
    item: DataItemType,
    lazyLoad: boolean,
    asOf: YearMonth,
}

const ConsoleCardInner = React.memo(function ConsoleCardInner(props: ConsoleCardInnerProps) {
    const {item, asOf} = props;
    const {inflationData} = useData();
    const current = greaterThanOrEqual(asOf, item.release_year_month);
    let price: string;
    if (current) {
        price = "$" + priceAfterInflation(inflationData, item, asOf).map(s => s.toLocaleString()).join("/$");
    } else {
        price = "Not Released";
    }
    return (
        <div
            className={style.paper}
            style={{"--opacity": current ? "1" : "0.5"} as CSSProperties}
        >
            <h2>{item.names[0]}</h2>
            {item.affiliateLink && <a
                target="blank"
                rel="noopener"
                href={item.affiliateLink}
            >
                Buy
            </a>}
            <div className={style.spacer} />
            <a href={item.link}>
                <picture>
                    <source srcSet={`
                                ${item.img300Webp} 1x,
                                ${item.img600Webp} 2x,
                                ${item.img900Webp} 3x,
                                ${item.img1200Webp} 4x,
                                ${item.img1800Webp} 6x
                                `.replace(/\s+/gs, " ")}
                            type="image/webp"
                    />
                    <img
                        alt={`Picture of ${item.names[0]}`}
                        srcSet={`
                                 ${item.img300Jpeg} 1x,
                                 ${item.img600Jpeg} 2x,
                                 ${item.img900Jpeg} 3x,
                                 ${item.img1200Jpeg} 4x,
                                 ${item.img1800Jpeg} 6x
                                 `.replace(/\s+/gs, " ")}
                        src={item.img300Jpeg}
                        width="300"
                        height="150"
                        className={style.imgClass}
                        loading={props.lazyLoad ? "lazy" : undefined}
                    />
                </picture>
            </a>
            <h2>{price}</h2>
            <div>
                {item.manufacturer} - {item.release_year_month.year}
            </div>
            <div>
                Original Price{item.orig_prices.length > 1 ? "s" : ""}: ${item.orig_prices.map(s => s.toLocaleString()).join("/$")}
            </div>
        </div>
    )
});

type WrapperProps = {
    index: number,
    enabled: boolean,
}

type ConsoleCardProps = {
    item: DataItemType,
    enabled: boolean,
    order: number,
    asOf: YearMonth,
}

const ConsoleCard = React.memo(function ConsoleCard(props: ConsoleCardProps) {
    const {item, asOf} = props;
    return (
        <div
            className={style.wrapper}
            style={{
                "--index": props.order,
                "--display": props.enabled ? "block" : "none",
            } as CSSProperties}
        >
            <ConsoleCardInner item={item} lazyLoad={props.order >= 12} asOf={asOf} />
        </div>
    );
});

export default ConsoleCard;
