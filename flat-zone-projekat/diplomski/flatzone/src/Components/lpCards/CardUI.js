import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    CardMedia,
    Grid,
} from "@mui/material";
import Cards from "./Cards";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const CardUI = (props) => {
    const [users, setUsers] = useState([]);

    const url = 'https://flat-zone-9f598-default-rtdb.europe-west1.firebasedatabase.app/users.json';
    const {offer} = props;

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something is wrong. Can't load data!")
            }
            const responseData = await response.json();

            let loadedUsers = [];
            for (const user in responseData) {
                loadedUsers.push({
                    id: user,
                })
            }
            setUsers(loadedUsers);
        };
        fetchUsers()

    }, []);

    return (
        <Grid item xs={12} sm={6} md={4} height="auto" display="flex" sx={{py: 10}}>
            <Card height="auto" display="flex" sx={{flexDirection: "column", height: 'fit-content', maxWidth: 300}}>
                <CardContent height="auto" sx={{flexGrow: 1}}>
                    <Cards key={offer.id}
                           id={offer.id}
                           description={offer.description}
                           image={
                               <CardMedia component="img" image={offer.image} alt="image"/>}
                           type={offer.type}
                           status={offer.status}
                           location={offer.location}
                           price={offer.price}
                           title={offer.title}
                           email={offer.email}

                    />
                </CardContent>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom variant="h6" component="h2">
                            Contact:
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {offer.email}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Card>
        </Grid>
    )
};
export default CardUI;
