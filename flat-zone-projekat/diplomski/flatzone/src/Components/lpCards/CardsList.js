import{useEffect, useState} from "react";
import * as React from 'react';
import Grid from "@mui/material/Grid";
import CardUI from "./CardUI";
import Filter from "./Filter";
import {Alert, Box, IconButton, Snackbar, Stack, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const CardsList = () => {
    const [offers, setOffers] = useState([]);
    const[errorMessage, setErrorMessage]= useState([])
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const url = 'https://flat-zone-9f598-default-rtdb.europe-west1.firebasedatabase.app/offers.json';

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const filterByLocation = (locationValue) => {
        if (locationValue === "") {
            setFilteredOffers(offers);
        } else {
            const filteredOffersByLocation = offers.filter((offer) => offer.location.includes(locationValue)
            );
            setFilteredOffers(filteredOffersByLocation)
            if (filteredOffersByLocation.length === 0) {
                setErrorMessage(`No offers available for location: ${locationValue}`);
                setOpen(true);
            } else {
                setErrorMessage("");
            }
        }
    };

        const fetchOffers = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something is wrong. Can't load data!")
            }
            const responseData = await response.json();

            let loadedOffers = [];
            for (const user in responseData) {
                const offers = responseData[user];
                for (const offerKey in offers) {
                    const offer = offers[offerKey];
                    if (offer.status === 'ACTIVE') {
                        loadedOffers.push({
                            id: user,
                            ...offer
                        })
                    }

                }
            }
            setOffers(loadedOffers);
        };
        useEffect(() => {
            fetchOffers()

        });

    const list = filteredOffers.length !== 0 ? filteredOffers : offers;

    const offerList = list.map((offer) => (
        <CardUI key={offer.id} offer={offer}>
        </CardUI>
    ));
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <>
                <Filter filterByLocation={filterByLocation}/>
                <Grid container spacing={2}>
                    {offerList}
                </Grid>
                {errorMessage !== "" && <Snackbar  variant="filled" open={open} autoHideDuration={3000} onClose={handleClose} action={action}>
                    <Alert  variant="filled" severity="error" onClose={handleClose} sx={{ width: '100%' }}>{errorMessage} </Alert>
                </Snackbar>}

        </>
    )
};
export default CardsList;
