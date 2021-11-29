import {DataItemType} from "../util/data";
import React from "react";
import {styled} from "linaria/react";
import {css} from "linaria";

const Paper = styled.div`
    background-color: white;
    border-radius: 4px;
    text-align: center;
    height: 100%;
    padding: 8px;
    display: flex;
    flex-flow: column nowrap;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
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
            <h3>{item.names[0]}</h3>
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
            <h1>${item.prices.join("/$")}</h1>
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
    flex: 1 0 275px;
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
