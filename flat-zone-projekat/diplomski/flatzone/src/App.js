import React, {useEffect, Suspense} from "react";
import {
    Route, Routes, useNavigate
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";

function App() {

    const [progress, setProgress] = React.useState(0);

    const AdminHome = React.lazy(() => import("./Containers/Admin/aHome"));
    const Home = React.lazy(() => import("./Containers/Home/Home"));
    const Register = React.lazy(() => import("./Containers/Register/register"));
    const LogIn = React.lazy(() => import("./Containers/Login/log"));

    let navigate = useNavigate();
    useEffect(() => {
        const authToken = localStorage.getItem('token');

        if (authToken) {
            navigate('/admin')
        }

        if (!authToken) {
            navigate('/login');
            navigate('/register');
            navigate('/home');
        }
    }, []);

    return (
        <div className="App">
            <Suspense fallback={
                <Box sx={{display: 'flex', justifyContent: "center", mt: "40px"}}>
                    <CircularProgress value={progress}/>
                </Box>
            }>
                <>
                    <Routes>

                        <Route path='/home' element={<Home/>}/>
                        <Route path="/login" element={<LogIn/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path="/admin" element={<AdminHome/>}/>
                    </Routes>
                </>
            </Suspense>
        </div>
    )
}

export default App;

