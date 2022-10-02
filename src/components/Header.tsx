import {DataType} from "../util/data";
import React, {useState} from "react";
import {styled} from "linaria/react";
import ShowIfJs from "./ShowIfJs";
import {theme} from "./theme";

const Expand = styled.button`
    color: white;
    background-color: unset;
    padding: 0;
    border: 0;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
        text-decoration-thickness: 3px;
    }
`;

const HeaderArea = styled.header`
    color: white;
    text-align: center;
    background-color: ${theme.colors.primary};
    padding: ${2 * theme.gap}px 0;
`;

const TextArea = styled.p`
    width: calc(min(100% - ${2 * theme.gap}px, ${theme.breakpoint}));
    margin: auto;
`

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
    const switchYear = switchItem.release_year_month.year;
    const origSwitchPrice = switchItem.orig_prices[0];
    const todaysSwitchPrice = switchItem.prices[0];
    const switchDiscount = (switchItem.raw_prices[0] - switchItem.raw_orig_prices[0]).toLocaleString();
    return (
        <HeaderArea>
            <h1>Console Prices Adjusted for Inflation</h1>
            {
                isOpen &&
                <TextArea>
                    Prices have been adjusted for inflation since the consoles
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
                </TextArea>
            }
            {
                !isOpen &&
                <TextArea>
                    Prices have been adjusted for inflation
                    <ShowIfJs component="span">
                        ...&nbsp;
                        <Expand
                            onClick={(e) => {
                                setOpen(true);
                            }}
                        >
                            More
                        </Expand>
                    </ShowIfJs>
                </TextArea>
            }
        </HeaderArea>
    );
};
