import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import OfferCard from "./OfferCard";
import Typography from "@mui/material/Typography";


const OffersList = (props) => {
    const [offers, setOffers] = useState([]);
    const userId = localStorage.getItem('idUser', props.localId);
    const url = 'https://flat-zone-9f598-default-rtdb.europe-west1.firebasedatabase.app/offers/' + userId + '.json';


    const fetchOffers = async () => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Something is wrong. Can't load data!")
        }
        const responseData = await response.json();

        let loadedOffers = [];
        for (const key in responseData) {
            loadedOffers.push({
                id: key,
                key: key,
                title: responseData[key].title,
                description: responseData[key].description,
                location: responseData[key].location,
                price: responseData[key].price,
                type: responseData[key].type,
                status: responseData[key].status,
                image: responseData[key].image
            })
        }
        setOffers(loadedOffers)
    };
    useEffect(()=>{
        fetchOffers()
})



    const offerList = offers.map((offer) => (

        <OfferCard key={offer.id} offer={offer}>
        </OfferCard>

    ));

    return (
        <Grid container spacing={2} direction="row">
            {offerList.length > 0 ? offerList : <Grid container justifyContent="center"><Typography sx={{color: "#01579b", textAlign: "center"}} variant="h4" component="h2">Add your first offer.</Typography></Grid>}
        </Grid>

    )
};
export default OffersList;
