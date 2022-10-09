import {priceAfterInflation} from "../util/data";
import React from "react";
import {styled} from "linaria/react";
import {css} from "linaria";
import {theme} from "./theme";
import {YearMonth} from "../util/yearMonth";
import {useData} from "../util/useData";
import {DataItemType} from "../util/loadData";

const Paper = styled.div`
    height: 100%;
    padding: ${theme.gap}px;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.borderRadius};
`;

const Spacer = styled.div`
    flex-grow: 1;
`

const imgClass = css`
    margin: auto;
`;

type ConsoleCardInnerProps = {
    item: DataItemType,
    lazyLoad: boolean,
}

const ConsoleCardInner = React.memo(function ConsoleCardInner(props: ConsoleCardInnerProps) {
    const {item} = props;
    const {data, inflationData} = useData();
    return (
        <Paper>
            <h2>{item.names[0]}</h2>
            {item.affiliateLink && <a
                target="blank"
                rel="noopener"
                href={item.affiliateLink}
            >
                Buy
            </a>}
            <Spacer />
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
                        className={imgClass}
                        loading={props.lazyLoad ? "lazy" : undefined}
                    />
                </picture>
            </a>
            <h2>${priceAfterInflation(inflationData, item, data.inflation_year_month).map(s => s.toLocaleString()).join("/$")}</h2>
            <div>
                {item.manufacturer} - {item.release_year_month.year}
            </div>
            <div>
                Original Price{item.orig_prices.length > 1 ? "s" : ""}: ${item.orig_prices.map(s => s.toLocaleString()).join("/$")}
            </div>
        </Paper>
    )
});

type WrapperProps = {
    index: number,
    enabled: boolean,
}

const Wrapper = styled.div<WrapperProps>`
    order: ${(props: {index: number}) => props.index};
    display: ${(props: {enabled: boolean}) => props.enabled ? "block" : "none"};
`;

type ConsoleCardProps = {
    item: DataItemType,
    enabled: boolean,
    order: number,
}

const ConsoleCard = React.memo(function ConsoleCard(props: ConsoleCardProps) {
    const {item} = props;
    return (
        <Wrapper enabled={props.enabled} index={props.order}>
            <ConsoleCardInner item={item} lazyLoad={props.order >= 12} />
        </Wrapper>
    );
});

export default ConsoleCard;
