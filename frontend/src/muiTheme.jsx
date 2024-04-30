import { createTheme } from "@mui/material";

const Theme = createTheme({
    palette: {
        primary: {
            main: "#06038D",
        },
        secondary: {
            main: "#FF0000",
        },
    },
    typography: {
        fontFamily: ["Popins", "sans-serif"].join(",")
    },
});

export default Theme;
