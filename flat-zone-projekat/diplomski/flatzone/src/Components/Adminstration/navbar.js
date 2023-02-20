import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
    Alert,
    CardMedia, CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, LinearProgress, RadioGroup, Snackbar,
    Stack,
    TextField
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import HouseIcon from "@mui/icons-material/House";
import {useContext, useState} from "react";
import AuthContext from "../../store/auth-context";
import {Controller, useForm} from "react-hook-form";
import Radio from "antd/es/radio/radio";
import Grid from "@mui/material/Grid";
import {DatePicker} from "@mui/x-date-pickers";
import color from "color";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {storage} from '../../data/firebase';
import CloseIcon from "@mui/icons-material/Close";


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export default function FormDialog(props) {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/home`;
        navigate(path);
        authCtx.logout();
    };
    const {control, handleSubmit, reset} = useForm({
        mode: "all",
        reValidateMode: "onBlur",
    });

    const authCtx = useContext(AuthContext);


    const [value, setValue] = React.useState();
    const [isAddedApartment, setAddedApartment] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openSucc, setOpenSucc] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState([])
    const [successMessage, setSuccessMessage] = useState([])
    const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSucc(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = useState('');
    const openSnack = () => {
        setOpen(true);
    };
    const closeSnack = () => {
        setOpen(false);
    };
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);


    function handleChange(event) {
        setFile(event.target.files[0]);
    }


    const onSubmit = async (data) => {
        if (!file) {
            return
        }
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (urlImage) => {
                        console.log('Added', urlImage);
                        setSuccessMessage("You added your offer!")
                        setOpenSucc(true);
                        setAddedApartment(true);
                        setIsLoading(true)
                        reset(percent);
                        console.log(percent)
                        // noinspection JSCheckFunctionSignatures
                        let id = localStorage.getItem('idUser', data.localId);
                        let email = localStorage.getItem('email', data.email);
                        let url;
                        url = 'https://flat-zone-9f598-default-rtdb.europe-west1.firebasedatabase.app/offers/' + id + '.json';
                        fetch(url, {
                            method: "POST",
                            body: JSON.stringify({
                                title: data.title,
                                location: data.location,
                                description: data.description,
                                price: data.price + "KM",
                                type: data.type,
                                status: data.status,
                                date: data.datetime,
                                image: urlImage,
                                email: email
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
                    });
            }
        );
        console.log(data);
        reset();
    };

    const action = (

        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnack}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <Grid item xs={2} sm={8} md={12}>
            <Box sx={{flexGrow: 1}}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar sx={{bgcolor: "#01579b"}}>
                        <HouseIcon sx={{mr: 2}} onClick={routeChange}/>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Flatzone
                        </Typography>

                        <Stack direction='row' spacing={2}>
                            <Button variant="contained" sx={{bgcolor: "#01579b", marginLeft: "15px"}}
                                    onClick={handleClickOpen}>Add Offer</Button>
                            <Button variant="contained" sx={{bgcolor: "#01579b"}} onClick={routeChange}>Log out</Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle sx={{bgcolor: "#01579b", color: "white"}}> Add Apartment</DialogTitle>
                    <DialogContent component="form"
                                   onSubmit={handleSubmit(onSubmit)}
                                   sx={{mt: 3}}>
                        <Controller
                            control={control}
                            name="title"
                            defaultValue=""
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    sx={{mt: 3, mb: 2}}
                                    {...field}
                                    type="text"
                                    variant="standard"
                                    required
                                    fullWidth
                                    label="Title"
                                    error={!!error}
                                    helperText={error ? error.message : ""}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Title is required",
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
                            name="description"
                            defaultValue=""
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    sx={{mt: 3, mb: 2}}
                                    {...field}
                                    type="text"
                                    required
                                    variant="standard"
                                    fullWidth
                                    label="Description"
                                    error={!!error}
                                    helperText={error ? error.message : ""}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Description is required",
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
                            name="location"
                            defaultValue=""
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    sx={{mt: 3, mb: 2}}
                                    {...field}
                                    type="text"
                                    required
                                    variant="standard"
                                    fullWidth
                                    label="Location"
                                    error={!!error}
                                    helperText={error ? error.message : ""}

                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Location is required "

                                },
                                pattern: {
                                    value: /[A-Za-z]/,
                                    message: "Sorry this form can only handle names with characters"
                                }
                            }}
                        />
                        <Controller
                            control={control}
                            name="price"
                            defaultValue=""
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    sx={{mt: 3, mb: 2}}
                                    {...field}
                                    required
                                    variant="standard"
                                    fullWidth
                                    label="Price"
                                    error={!!error}
                                    helperText={error ? error.message : ""}


                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Price is required",
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Only numbers are allowed",
                                },
                            }}
                        />
                        <Grid
                            container
                            direction="column"
                        >
                            <Controller
                                control={control}
                                name="type"
                                defaultValue=""
                                render={({field, fieldState: {error}}) => (
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"

                                        >
                                            <FormControlLabel   defaultValue=""  {...field} value="Rent" control={<Radio/>} label="Rent"/>
                                            <FormControlLabel   defaultValue="" {...field} value="Selling" control={<Radio/>}
                                                               label="Selling"/>
                                        </RadioGroup>
                                    </FormControl>
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Type is required",
                                    },
                                }}
                            />
                            <Controller
                                control={control}
                                name="status"
                                defaultValue="NEW"
                                render={({field, fieldState: {error}}) => (
                                    console.log()
                                )}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    sx={{mt: 3, mb: 2}}
                                    label="Date"
                                    control={control}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            name="date"
                                            variant="standard"
                                            sx={{mt: 3, mb: 2}}
                                            {...params} />}
                                />
                            </LocalizationProvider>

                        </Grid>
                        <Grid container direction="column" justifyContent="space-between">

                            <Controller
                                control={control}
                                name=""
                                defaultValue=""
                                render={({field, fieldState: {error}}) => (
                                    <TextField type="file" className="input" required onChange={handleChange}
                                               sx={{bgcolor: "#e3f2fd", mt: 0.5, mb: 2}}/>
                                )}
                            />
                            <Button type="submit" variant="contained" sx={{bgcolor: "#01579b"}}
                                    onClick={handleSubmit(onSubmit)}>Add</Button>
                        </Grid>
                        <Snackbar
                            open={openSucc}
                            message={successMessage}
                            autoHideDuration={2500}
                            onClose={handleCloseSnack}
                            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                            variant="success"
                            action={action}
                        ><Alert variant="filled" action={action} severity="success">{successMessage}</Alert></Snackbar>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{bgcolor: "#c62828", color: "#e57373"}} onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Grid container>
                    <CardMedia
                        component="img"
                        sx={{maxWidth: 3000, height:850, justifyContent:"center", bgcolor: "#01579b"}}
                        image="https://mobileimages.lowes.com/productimages/606b0d68-415b-49db-94f6-61c3840582da/45409103.jpg"

                    />
                </Grid>
            </Box>
        </Grid>
    );
}

