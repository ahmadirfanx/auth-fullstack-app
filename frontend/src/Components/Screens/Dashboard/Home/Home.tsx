import React from 'react';
import { useStyles } from './Styles';
import { getAll, getById, post, patch, deleteById } from "../../../../Services/GenericApiService";
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
            <Box sx={{ display: 'flex', minHeight: '99vh', backgroundColor: 'rgba(222, 223, 223, 0.3)' }}>

                <h4 className="mx-2">Dashboard</h4>

                <div className="col-md-12 mb-0 pb-0 mx-3">
                    <Typography className="my-0 py-0" sx={{ fontSize: 16 }} color="text.secondary" variant="overline">
                        Welcome to Dashboard
                    </Typography>
                </div>
            </Box>
        </>
    );
}

export default Home;
