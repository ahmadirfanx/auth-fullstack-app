import React from 'react';
import { useStyles } from './Styles';
import { log } from "../../../../Services/LoggerService";
import { useEffect } from 'react';
import { Typography, Box } from "@mui/material";



function Home() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false)

    //modules for api calling
    const moduleDashboard = 'dashboard/tiles'
    const moduleClientStats = 'dashboard/clientstats'


    return (
        <>

            <div className="row">
                <div className="col-md-10 mt-3 py-3 bg-dark mx-auto">
                    <h4 className="mx-2 text-white">Home</h4>
                </div>

                <div className="col-md-6 mt-4 mx-auto">
                    <div className="justify-content-center text-center">
                        <h2>Welcome to Home Screen 🫡</h2>
                        <p className="mb-4">
                            Let's get you rolling 
                        </p>
                        <img className="img-fluid"
                            src={require('../../../../Assets/img/home-cover.jpg')} width="70%" />
                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;
