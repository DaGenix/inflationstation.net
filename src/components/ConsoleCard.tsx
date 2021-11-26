import {DataItemType} from "../util/data";
import {Box, Paper, useTheme} from "@mui/material";

type ConsoleCardProps = {
    item: DataItemType,
    enabled: boolean,
}

export default function ConsoleCard(props: ConsoleCardProps) {
    const theme = useTheme();
    const {item, enabled} = props;
    return (
        <Paper sx={{
            display: (!enabled) ? "none" : "flex",
            flexFlow: "column nowrap",
            textAlign:"center",
            p: 1,
        }}>
            <h3>{item.names[0]}</h3>
            <a href={item.link}>
                <picture>
                    <source srcSet={`
                            ${item.img200Webp} 200w,
                            ${item.img400Webp} 400w,
                            ${item.img600Webp} 600w,
                            ${item.img800Webp} 800w,
                            ${item.img1600Webp} 1600w
                            `.replace(/\s+/gs, " ")}
                            sizes={`(max-width: ${theme.breakpoints.values["sm"]}px) 70vw, 200px`}
                            type="image/webp"
                    />
                    <img
                        alt={`Picture of ${item.names[0]}`}
                        srcSet={`
                             ${item.img200Jpeg} 200w,
                             ${item.img400Jpeg} 400w,
                             ${item.img600Jpeg} 600w,
                             ${item.img800Jpeg} 800w,
                             ${item.img1600Jpeg} 1600w
                             `.replace(/\s+/gs, " ")}
                        sizes={`(max-width: ${theme.breakpoints.values["sm"]}px) 70vw, 200px`}
                        src={item.img200Jpeg}
                    />
                </picture>
            </a>
            <h1>${item.prices.join("/$")}</h1>
            <Box sx={{flexGrow: 1}} />
            {item.affiliateLink && <Box
                component="a"
                target="blank"
                rel="noopener"
                href={item.affiliateLink}
            >
                Buy
            </Box>}
            <Box>
                {item.manufacturer} - {item.year}
            </Box>
            <Box>
                Original Price{item.orig_prices.length > 1 ? "s" : ""}: ${item.orig_prices.join("/$")}
            </Box>
        </Paper>
    );
}
