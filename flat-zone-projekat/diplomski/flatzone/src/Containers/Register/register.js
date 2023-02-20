import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Controller, useForm} from "react-hook-form";
import {useContext, useState} from "react";
import AuthContext from '../../store/auth-context';
import {useNavigate} from "react-router-dom";
import { app } from '../../data/firebase';
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Alert, IconButton, Snackbar} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@mui/material/Link";


export default function Register () {
    const navigate = useNavigate();
    const {control, handleSubmit, watch, register, errors} = useForm({
        mode: "all",
        reValidateMode: "onBlur",
    });
    const routeHome = () => {
        let path = `/home`;
        navigate(path);
    };

    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    };

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
    const onSubmit = async (data) => {

        setIsLoading(true);
       let url;
        url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzUkDmXRepWIZxhwUQs4AVd-__LAdH98k';
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let urlRegister;
        urlRegister = 'https://flat-zone-9f598-default-rtdb.europe-west1.firebasedatabase.app/users.json';
        await fetch(urlRegister, {
            method: "POST",
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                phoneNumber: data.phone,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    setSuccessMessage('Registered');
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
                    new Date().getTime() + +data.expiresIn * 1000
                );
                authCtx.login(data.idToken, expirationTime);
                localStorage.setItem('idUser', data.localId);
                navigate('/login');
                console.log(data)

            });
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
                    <Avatar sx={{ m: 1, bgcolor: "#0277bd" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Register
                    </Typography>
                    <Grid container  direction="row" alignItems="center" gap={1}>
                                <ArrowBackIcon onClick={routeHome} />
                        <Typography variant="body1" >Back</Typography>
                    </Grid>
                    <Box component="form"
                         onSubmit={handleSubmit(onSubmit)}
                         sx={{mt: 3}}>
                        <Controller
                            control={control}
                            name="firstName"
                            defaultValue=""
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    sx={{ mt: 3, mb: 2 }}
                                    {...field}
                                    type="text"
                                    required
                                    fullWidth
                                    label="First Name"
                                    error={!!error}
                                    helperText={error ? error.message : ""}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: "First name is required",
                                },
                                pattern: {
                                    value: /[A-Za-z]/,
                                    message:
                                        "Sorry this form can only handle names with characters"
                                }
                            }}
                        />
                        <Controller
                            control={control}
                            name="lastName"
                            defaultValue=""
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    sx={{ mt: 3, mb: 2 }}
                                    {...field}
                                    type="text"
                                    required
                                    fullWidth
                                    label="Last Name"
                                    error={!!error}
                                    helperText={error ? error.message : ""}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Last name is required",
                                },
                                pattern: {
                                    value: /[A-Za-z]/,
                                    message:
                                        "Sorry this form can only handle names with characters"
                                }
                            }}
                        />
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
                                // pattern: {
                                //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/,
                                //     message: "invalid email address"
                                // }
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
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                }
                            }}
                        />
                        <Controller
                            control={control}
                            name="password_repeat"
                            defaultValue=""
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    sx={{ mt: 3, mb: 2 }}
                                    {...field}
                                    name="password_repeat"
                                    type="password"
                                    required
                                    fullWidth
                                    label="Confirm password"
                                    error={!!error}
                                    helperText={error ? error.message : ""}
                                />

                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Password is required",
                                },
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                }
                            }}
                        />

                        <Controller
                            control={control}
                            name="phone"
                            defaultValue=""
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    sx={{ mt: 3, mb: 2 }}
                                    {...field}
                                    type="number"
                                    required
                                    fullWidth
                                    label="Phone Number"
                                    error={!!error}
                                    helperText={error ? error.message : ""}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Phone number is required",
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: "#0277bd" }}>
                          Submit
                        </Button>
                        <Grid container sx={{ mt: 2, mb: 2 }}>
                            <Grid item>
                                <Link  variant="body2"  onClick={routeChange}>
                                    {"You already have a user account? Sign in here"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Snackbar
                            open={openError}
                            message={errorMessage}
                            autoHideDuration={3000}
                            variant="error"
                            onClose={handleErrorClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            action={actionErr}
                        ><Alert variant="filled" action={actionErr} severity="error">{errorMessage}</Alert></Snackbar>
                        <Snackbar
                            open={openSuccess}
                            message={successMessage}
                            autoHideDuration={3000}
                            onClose={handleSuccessClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="success"
                            action={action}
                        ><Alert variant="filled"  action={action} severity="success">{successMessage}</Alert></Snackbar>
                    </Box>
                </Box>
            </Container>

    )
}
