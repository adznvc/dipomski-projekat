import Navbar from "../../Components/Adminstration/navbar";
import Footer from "../../Components/Footer/footer";
import { Card} from "@mui/material";
import OffersList from "../../Components/Adminstration/OffersList";


export default function AdminHome() {

    return (
        <div>
            <Navbar/>
            <Card   sx={{
                textAlign: "center",
                backgroundColor: "#01579b",
                m: "auto",
                height: "auto",
                minHeight: "100vh",
                pt:"70px"
            }}>
                <Card  sx={{bgcolor:"#eceff1",py:5,px:2,textAlign: "center", pt:"65px",  maxWidth: 1320, m: "auto"}} >
                    <OffersList/>
                </Card>
            </Card>
            <Footer/>
        </div>
    )
};

