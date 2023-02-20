import React, {useState} from "react";
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Grid, IconButton, Snackbar,
    Stack, TextField
} from "@mui/material";
import Offer from "./Offer";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../data/firebase";
import {Controller, useForm} from "react-hook-form";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CloseIcon from "@mui/icons-material/Close";

const OfferCard = (props) => {

    const {offer} = props;
    const {fetchOffers} = props;
    const [openSucc, setOpenSucc] = React.useState(false);
    const[errorMessage, setErrorMessage]= useState([])
    const[successMessage, setSuccessMessage]= useState([])
    const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSucc(false);
    };

    const deleteDialogOpen = () => {
        setOpenDialogDelete(true);
    };

    const deleteDialogClose = () => {
        setOpenDialogDelete(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState(false);
    const [openDeleteDialog, setOpenDialogDelete] = React.useState(false);
    const [isAddedApartment, setAddedApartment] = useState(false);
    const {control, handleSubmit} = useForm({
        mode: "all",
        reValidateMode: "onBlur",
    });
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const onDelete = (data)=> {
        let id = localStorage.getItem('idUser', data.localId);
        let apartmentId = offer.id;
        let url;
        url = 'https://flat-zone-9f598-default-rtdb.europe-west1.firebasedatabase.app/offers/' + id + "/" +  apartmentId + '.json';
        fetch(url, {
            method: "DELETE",
            body: JSON.stringify({
               id: offer.id
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
    };

    const onSubmit = async (data) => {
        let imageUrl = offer.image; // initialize imageUrl to existing image URL
        if (file) { // check if a new file has been selected
            const storageRef = ref(storage, `/files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            await uploadTask;
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        }

        let id = localStorage.getItem('idUser', data.localId);
        let apartmentId = offer.id;
        let email = localStorage.getItem('email', data.email);
        let url = `https://flat-zone-9f598-default-rtdb.europe-west1.firebasedatabase.app/offers/${id}/${apartmentId}.json`;
        fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                title: data.title,
                location: data.location,
                description: data.description,
                price: data.price + " KM",
                type: data.type,
                status: data.status,
                date: data.datetime,
                image: imageUrl,
                email: email
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                console.log('Offer updated');
                setSuccessMessage("You updated your offer!");
                setOpenSucc(true);
                setAddedApartment(true);
            })
            .catch((error) => {
                console.error('Error updating offer:', error);
            });
        console.log(data);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnack}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <Grid item xs={12} sm={6} md={4} height="auto" display="flex" sx={{py: 10}}>
            <Card height="auto" display="flex" sx={{flexDirection: "column", maxWidth:320}}>
                <CardContent height="auto" sx={{flexGrow: 1}}>
                    <Offer key={offer.id}
                           id={offer.id}
                           description={offer.description}
                           image={
                               <CardMedia component="img" height="260px" width="350px" image={offer.image}
                                          alt="image"/>}
                           type={offer.type}
                           status={offer.status}
                           location={offer.location}
                           price={offer.price}
                           title={offer.title}
                    />
                </CardContent>
                <CardActions>
                    <Stack direction="row" justifyContent="spaceBetween" margin="auto" spacing={16}>
                        <Button variant="contained" type="submit" sx={{bgcolor: "#01579b"}} onClick={handleClickOpen}>Update</Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle sx={{bgcolor: "#01579b", color: "white"}}> Update Apartment</DialogTitle>
                            <DialogContent component="form"
                                           onSubmit={handleSubmit(onSubmit)}
                                           sx={{mt: 3}}>
                                <Controller
                                    control={control}
                                    name="title"
                                    defaultValue={offer.title}
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
                                    defaultValue={offer.description}
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
                                    defaultValue={offer.location}
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
                                    defaultValue={Number(offer.price.replace(/\D/g, ""))}
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
                                <Grid container direction="column">
                                    <Controller
                                        control={control}
                                        name="status"
                                        render={({field, fieldState: {error}}) => (
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="radio-buttons-group"
                                                    defaultValue={offer.status}
                                                >
                                                    <FormControlLabel  {...field} value="ACTIVE" control={<Radio/>} label="Active"/>
                                                    <FormControlLabel  {...field} value="SOLD" control={<Radio/>} label="Sold"/>
                                                    <FormControlLabel  {...field} value="RENTED" control={<Radio/>} label="Rented"/>
                                                </RadioGroup>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>

                                <Grid
                                    container
                                    direction="column"
                                >
                                    <Controller
                                        control={control}
                                        name="type"
                                        defaultValue={offer.type}
                                        render={({field, fieldState: {error}}) => (
                                            <TextField
                                                sx={{mt: 3, mb: 2}}
                                                {...field}
                                                required
                                                variant="standard"
                                                fullWidth
                                                label="Type"
                                                error={!!error}
                                                helperText={error ? error.message : ""}


                                            />
                                        )}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Type is required",
                                            },
                                        }}
                                    />


                                </Grid>
                                <Grid container direction="column" justifyContent="space-between">

                                    <Controller
                                        control={control}
                                        name=""
                                        render={({field, fieldState: {error}}) => (
                                            <TextField  type="file"  required onChange={handleChange}
                                                       sx={{bgcolor: "#e3f2fd",mt: 0.5, mb: 2}}/>
                                        )}
                                    />


                                    <Button type="submit" variant="contained" sx={{bgcolor: "#01579b"}}
                                            onClick={handleSubmit(onSubmit)}>Update</Button>
                                    <Snackbar
                                        open={openSucc}
                                        message={successMessage}
                                        autoHideDuration={2500}
                                        onClose={handleCloseSnack}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                        variant="success"
                                        action={action}
                                    ><Alert variant="filled"  action={action} severity="success">{successMessage}</Alert></Snackbar>
                                    {/*<Snackbar  variant="filled" open={openSucc} autoHideDuration={6000} onClose={handleCloseSnack} action={action}>*/}
                                    {/*    <Alert  variant="filled" severity="success" onClose={handleCloseSnack} sx={{ width: '100%' }}>{successMessage} </Alert>*/}
                                    {/*</Snackbar>*/}
                                </Grid>

                            </DialogContent>
                            <DialogActions>
                                <Button sx={{bgcolor: "#c62828", color: "#e57373"}} onClick={handleClose}>Cancel</Button>
                            </DialogActions>
                        </Dialog>

                        <Button variant="contained" sx={{bgcolor: "#01579b", margin: "10px, 9px"}} type="submit" onClick={deleteDialogOpen}>Delete</Button>
                        <Dialog
                            open={openDeleteDialog}
                            onClose={deleteDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete this offer?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={onDelete} autoFocus variant="contained" sx={{bgcolor: "#01579b", margin: "10px, 9px"}}>
                                    Agree
                                </Button>
                                <Button onClick={deleteDialogClose}>Disagree</Button>
                            </DialogActions>
                        </Dialog>
                    </Stack>
                </CardActions>
            </Card>
        </Grid>
    )
};
export default OfferCard;
