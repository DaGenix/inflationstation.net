import {DataItemType} from "../util/data";
import React from "react";
import {styled} from "linaria/react";
import {css} from "linaria";
import {theme} from "./theme";

const Paper = styled.div`
    height: 100%;
    padding: ${theme.gap}px;
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
    return (
        <Paper>
            <h2>{item.names[0]}</h2>
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
            <h2>${item.prices.join("/$")}</h2>
            <Spacer />
            {item.affiliateLink && <a
                target="blank"
                rel="noopener"
                href={item.affiliateLink}
            >
                Buy
            </a>}
            <div>
                {item.manufacturer} - {item.year}
            </div>
            <div>
                Original Price{item.orig_prices.length > 1 ? "s" : ""}: ${item.orig_prices.join("/$")}
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
