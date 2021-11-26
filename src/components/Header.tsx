import {DataType} from "../util/data";
import React, {useState} from "react";
import {styled} from "linaria/react";

const Expand = styled.button`
    color: white;
    background-color: unset;
    padding: 0;
    border: 0;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
`;

const FooterBackground = styled.header`
    color: white;
    background: linear-gradient(45deg, #4A148C, #6A1B9A);
    box-shadow: 0 0 8px black;
    text-align: center;
    padding: 16px 8px;
`;

type HeaderProps = {
    data: DataType,
}

export default function Header(props: HeaderProps) {
    const {data} = props;
    const [isOpen, setOpen] = useState(false);
    const switchItem = data.data.find(i => i.names[0] === "Nintendo Switch");
    if (!switchItem) {
        throw new Error("Couldn't find item for Switch");
    }
    const switchYear = switchItem.year;
    const origSwitchPrice = switchItem.orig_prices[0];
    const todaysSwitchPrice = switchItem.prices[0];
    const switchDiscount = (switchItem.raw_prices[0] - switchItem.raw_orig_prices[0]).toLocaleString();
    return (
        <FooterBackground>
            <h1>Console Prices Adjusted for Inflation</h1>
            {isOpen &&
                <p>
                    Prices shown have been adjusted for inflation since the consoles
                    were initially released. Some consoles are still available at the same price
                    they were released at. Due to inflation, these consoles have effectively
                    become cheaper even though their price hasn't changed. For example, the
                    Switch was released in {switchYear} for ${origSwitchPrice}.
                    Due to inflation, ${origSwitchPrice} of goods in {switchYear} would now
                    cost ${todaysSwitchPrice}. Since the Switch's price hasn't changed,
                    its effectively become ${switchDiscount} cheaper than it was when
                    it was released.&nbsp;
                    <Expand
                        onClick={(e) => {
                            setOpen(false);
                        }}
                    >
                        Less
                    </Expand>
                </p>
            }
            {!isOpen &&
            <p>
                Prices shown have been adjusted for inflation since the consoles
                were initially released...&nbsp;
                <Expand
                    onClick={(e) => {
                        setOpen(true);
                    }}
                >
                    More
                </Expand>
            </p>
            }
        </FooterBackground>
    );
};
