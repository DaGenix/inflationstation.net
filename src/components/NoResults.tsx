import {Box, Typography} from "@mui/material";

export default function NoResults() {
    return (
        <Box
            sx={{
                textAlign: "center",
                px: 1,
                pb: 3,
            }}
            >
            <Typography component="h2">No Results</Typography>
            <Typography sx={{m: 0, p: 0}}>
                We couldn't find any consoles that matched your search.
                Please check your filter value and make sure that you selected the correct
                type of console.
            </Typography>
        </Box>
    )
}