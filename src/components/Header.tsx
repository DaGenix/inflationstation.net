import {Box, Typography} from "@mui/material";
import {DataType} from "../util/data";
import {useState} from "react";

type HeaderProps = {
    data: DataType,
}

export default function Header({data}: HeaderProps) {
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
        <Box
            component="header"
            sx={{
                color: "white",
                background: "linear-gradient(45deg, #4A148C, #6A1B9A)",
                boxShadow: "0 0 8px black",
                textAlign: "center",
                py: 2,
                px: 1,
            }}
        >
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
                    <Typography
                        color="white"
                        component="a"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                        }}
                    >
                        Less
                    </Typography>
                </p>
            }
            {!isOpen &&
            <p>
                Prices shown have been adjusted for inflation since the consoles
                were initially released...&nbsp;
                <Typography
                    color="white"
                    component="a"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setOpen(true);
                    }}
                >
                    More
                </Typography>
            </p>
            }
        </Box>
    );
}
