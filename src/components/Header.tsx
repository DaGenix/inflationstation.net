import {Box} from "@material-ui/core";

export default function Header() {
    return (
        <header>
            <Box
                sx={{
                    color: "white",
                    backgroundColor: "#6c4d70",
                    textAlign: "center",
                    py: 2,
                }}
            >
                <h1>Console Prices Adjusted for Inflation</h1>
            </Box>
        </header>
    );
}
