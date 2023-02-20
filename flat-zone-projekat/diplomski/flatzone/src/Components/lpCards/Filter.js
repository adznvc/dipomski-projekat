import React, {useEffect, useState} from "react";
import {
    Grid,
    TextField,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    MenuItem,
    Select,InputLabel,FormControl
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Filter = (props) => {
    const {filterByLocation} = props;
    const [enteredLocation, setEnteredLocation] = useState("");

    const locationChangeHandler = (event) => {
        setEnteredLocation(event.target.value);
        filterByLocation(event.target.value);
    };

    const submitFilter = (event) => {
        event.preventDefault();
        filterByLocation();
    };

    return (
        <Grid item xs={2} sm={8} md={12} sx={{textAlign: "center"}} pb="30px">
                <Accordion sx={{

                    mb: "10px"
                }}
                 >
                     <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                         id="panel1a-header"
                     >
                         <Typography gutterBottom variant="h6" component="h2">
                             Filter
                             </Typography>
                         <FilterListIcon sx={{ pl: "10px", pt: "2px" }}/>
                    </AccordionSummary>
                <AccordionDetails>
                    <TextField fullWidth label="City" variant="standard" sx={{mb: "10px"}} value={enteredLocation}
                               onChange={locationChangeHandler}/>
                </AccordionDetails>
            </Accordion>
        </Grid>

    )
}
export default Filter;
