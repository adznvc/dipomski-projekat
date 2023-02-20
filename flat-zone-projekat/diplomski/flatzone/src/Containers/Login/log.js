// noinspection ES6CheckImport,JSVoidFunctionReturnValueUsed
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {blue} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {useContext, useState} from "react";
import AuthContext from "../../store/auth-context";
import { getAuth} from 'firebase/auth';
import { app } from '../../data/firebase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Alert, IconButton, Snackbar} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function LogIn() {
    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/register`;
        navigate(path);
    };
    const routeHome = () => {
        let path = `/home`;
        navigate(path);
    };
    const routeAdmin = () => {
        let path = `/admin`;
        navigate(path);
    };

    const {control, handleSubmit} = useForm({
        mode: "all",
        reValidateMode: "onBlur",
    });
    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const handleErrorClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        setOpenError(false);
    };
    const handleSuccessClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        setOpenSuccess(false);
    };

    const onSubmit = (data) => {

        setIsLoading(true);
        let url;

        url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzUkDmXRepWIZxhwUQs4AVd-__LAdH98k';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: data.email,
                password:data.password,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    setSuccessMessage('Login success');
                    setOpenSuccess(true);
                    setIsLoading(true)
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        setErrorMessage('Authentication failed!');
                        setOpenError(true);
                        setIsLoading(true)
                        return res.json();
                    });
                }
            })

            .then((data) => {
                const expirationTime = new Date(
                    new Date().getTime() + +data.expiresIn * 3600
                );
                navigate('/admin');
                authCtx.login(data.idToken, expirationTime);
                localStorage.setItem('idUser', data.localId);
                localStorage.setItem('email', data.email);
            })
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSuccessClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const actionErr = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleErrorClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: blue[500] }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <Grid container  direction="row" alignItems="center" gap={1}>
                            <ArrowBackIcon onClick={routeHome} />
                            <Typography variant="body1">Back</Typography>
                        </Grid>
                        <Box component="form"
                             onSubmit={handleSubmit(onSubmit)}
                             sx={{mt: 2}}>
                            <Controller
                                control={control}
                                name="email"
                                defaultValue=""
                                render={({field, fieldState: {error}}) => (
                                    <TextField
                                        sx={{ mt: 3, mb: 2 }}
                                        {...field}
                                        type="text"
                                        required
                                        fullWidth
                                        label="E-mail"
                                        error={!!error}
                                        helperText={error ? error.message : ""}

                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "required email address"

                                    },
                                }}
                            />
                            <Controller
                                control={control}
                                name="password"
                                defaultValue=""
                                render={({field, fieldState: {error}}) => (
                                    <TextField
                                        sx={{ mt: 3, mb: 2 }}
                                        {...field}
                                        type="password"
                                        required
                                        fullWidth
                                        label="Password"
                                        error={!!error}
                                        helperText={error ? error.message : ""}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                }}
                            />

                          <Button  fullWidth type="submit"  variant="contained" onSubmit={routeAdmin}>Submit</Button>
                            <Grid container sx={{ mt: 2, mb: 2 }}>
                                <Grid item>
                                    <Link  variant="body2"  onClick={routeChange}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>

                        <Snackbar
                            open={openError}
                            message={errorMessage}
                            autoHideDuration={5000}
                            variant="error"
                            onClose={handleErrorClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            action={actionErr}
                        ><Alert variant="filled"         action={actionErr} severity="error">{errorMessage}</Alert></Snackbar>
                        <Snackbar
                            open={openSuccess}
                            message={successMessage}
                            autoHideDuration={4000}
                            onClose={handleSuccessClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="success"
                            action={action}
                        >
                            <Alert variant="filled"  action={action} severity="success">{successMessage}</Alert>
                        </Snackbar>
                    </Box>
                </Container>
    );
}
