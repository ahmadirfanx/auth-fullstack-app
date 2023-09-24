import React, {useEffect} from 'react';
import {removeJWT} from "../../../../Services/LocalStorageService";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";

function Logout() {

    // Router object
    const navigate = useNavigate();

    useEffect(() => {
        removeJWT();
        navigate('/login')
    }, [])

    return (
        <div className="vh-100 vw-100">
            <CircularProgress />
        </div>
    );
}


export default Logout;
