import Header from "../../Components/Landing/header";
import Footer from "../../Components/Footer/footer";
import {Box, Card, Container} from "@mui/material";
import CardsList from "../../Components/lpCards/CardsList";

export default function Home(props) {
    return (
        <div>
            <Header/>

            <Card   sx={{
                textAlign: "center",
                backgroundColor: "#01579b",

                m: "auto",
                height: "auto",
                minHeight: "100vh",
                pt:"70px"
            }}>
                <Card  sx={{bgcolor:"#eceff1",py:6,px:4,textAlign: "center",  maxWidth: 1500, m: "auto"}} >
                    <CardsList/>
                </Card>
            </Card>
            <Footer/>
        </div>

    )
}

