import {Box} from "@material-ui/core";
import {DataType} from "../util/data";

type HeaderProps = {
    data: DataType,
}

export default function Header({data}: HeaderProps) {
    const switchItem = data.data.find(i => i.names[0] === "Nintendo Switch");
    if (!switchItem) {
        throw new Error("Couldn't find item for Switch");
    }
    const switchYear = switchItem.year;
    const origSwitchPrice = switchItem.orig_prices[0];
    const todaysSwitchPrice = switchItem.prices[0];
    const switchDiscount = (switchItem.raw_prices[0] - switchItem.raw_orig_prices[0]).toLocaleString();
    return (
        <header>
            <Box
                sx={{
                    color: "white",
                    backgroundColor: "#6c4d70",
                    textAlign: "center",
                    py: 2,
                    px: 1,
                }}
            >
                <h1>Console Prices Adjusted for Inflation</h1>
                <p>
                    Prices show have been adjusted for inflation since the consoles
                    were initially released. Some consoles are still available at the same price
                    they were released at. Due to inflation, these consoles have effectively
                    become cheaper even though their price hasn't changed. For example, the
                    Switch was released in {switchYear} for ${origSwitchPrice}.
                    Due to inflation, ${origSwitchPrice} of goods in {switchYear} would now
                    cost ${todaysSwitchPrice}. Since the Switch's price hasn't changed,
                    its effectively become ${switchDiscount} cheaper than it was when
                    it was released.
                </p>
            </Box>
        </header>
    );
}
