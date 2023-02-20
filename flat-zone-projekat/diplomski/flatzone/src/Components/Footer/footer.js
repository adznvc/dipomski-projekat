import React from "react";
import {Typography, Box} from "@mui/material";

export default function Footer() {
    // noinspection ChainedFunctionCallJS
    return (

        <Box
            backgroundColor="#01579b"
            p="15px"
        >
            <Typography sx={{color: "white"}} variant="h6" color="text.secondary" align="center">
                {`Aplikacija za pronalazak smještaja uz korištenje React.js tehnologije © Azra Džinović, ${new Date().getFullYear()}., IPI Akademija Tuzla.`}
                {/* eslint-disable-next-line no-useless-concat */}
            </Typography>
        </Box>
    )
}
