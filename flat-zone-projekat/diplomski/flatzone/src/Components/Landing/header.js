import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HouseIcon from '@mui/icons-material/House';
import { alpha, CardMedia, Grid, InputBase, Stack} from "@mui/material";
// noinspection ES6CheckImport
import {useNavigate} from "react-router-dom";




export default function Header(props) {
    let navigate = useNavigate();
    const goToLogin = () => {
        let path = `/login`;
        navigate(path);
    };

    const goToRegister = () => {
        let pathRegister = `/register`;
        navigate(pathRegister);
    };

    return (
        <Grid item xs={2} sm={8} md={12}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar sx={{bgcolor: "#01579b"}}>
                        <HouseIcon sx={{mr: 2}}/>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Flatzone
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                        </Stack>
                        <Stack direction='row' spacing={2}>
                            <Button variant="contained" sx={{bgcolor: "#01579b", marginLeft: "10px"}}
                                    onClick={goToLogin}>Login</Button>
                            <Button variant="contained" sx={{bgcolor: "#01579b"}}
                                    onClick={goToRegister}>Register</Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <CardMedia
                        component="img"
                        sx={{ minWidth:"250px",height:"850px", justifyContent:"center", bgcolor: "#01579b"}}
                        image="https://mobileimages.lowes.com/productimages/606b0d68-415b-49db-94f6-61c3840582da/45409103.jpg"

                    />
                </Grid>
            </Box>
        </Grid>
    );
}






