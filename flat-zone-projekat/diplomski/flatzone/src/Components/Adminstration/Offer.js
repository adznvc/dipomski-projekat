import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    CardContent,
    CardMedia,
} from "@mui/material";

const Offer = (props) => {
    return (
        <Grid container justifyContent="center" height="auto" display="block" >
            <Typography gutterBottom variant="h5" component="h2" sx={{textAlign:"center"}}>
                {props.title}
            </Typography>
            <Grid item xs={2} sm={8} md={12}>
                <CardMedia
                    sx={{height:"260px", width: "297px", justifyContent:"center"}}
                    component="div"
                    alt="photo">
                    {props.image}
                </CardMedia>
            </Grid>
            <CardContent sx={{flexGrow: 4, textAlign: "center"}}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"

                    >
                        <Typography gutterBottom variant="h6" component="h2">
                            Description:
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {props.description}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Typography gutterBottom variant="h5" component="h2" sx={{mt: 2, mb: 2}}>
                    {props.status}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" sx={{mt: 2, mb: 2}}>
                    Type: {props.type}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" sx={{mt: 2, mb: 2}}>
                    Price: {props.price}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" sx={{mt: 2, mb: 2}}>
                    Location: {props.location}
                </Typography>
            </CardContent>

        </Grid>
    )

};
export default Offer;
