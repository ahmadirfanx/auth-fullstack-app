import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import {Alert, AlertTitle, Snackbar, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";


// @ts-ignore
const AlertM = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({

        successAlert(_title = '', _body = '') {
            // set title
            setTitle(_title === '' ? t('common.success') : _title);

            // set body
            setBody(_body === '' ? t('common.genericSuccess') : _body);

            // display alert
            setOpenSuccessAlert(true);
        },

        errorAlert(_title = '', _body = '') {
            // set title
            setTitle(_title == '' ? t('common.somethingWentWrong') : _title);

            // set body
            setBody(_body == '' ? t('common.tryAgain') : _body);

            console.log(title);

            // display alert
            setOpenErrorAlert(true);
        }

    }));

    // translation
    const {t} = useTranslation();

    // ui controls
    const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
    const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [editMode, setEditMode] = React.useState(false);

    // data vars
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');


    // ui handlers
    const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
    };


    return (
        <div>
            {/* Alerts */}
            <div>
                {/* Success Alert */}
                <Snackbar open={openSuccessAlert}
                          autoHideDuration={6000}
                          onClose={handleCloseAlert}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                    <Alert severity="success" onClose={handleCloseAlert} sx={{width: '100%'}}>
                        <AlertTitle>{title}</AlertTitle>
                        {body}
                    </Alert>
                </Snackbar>

                {/* Error Alert */}
                <Snackbar open={openErrorAlert}
                          autoHideDuration={6000}
                          onClose={handleCloseAlert}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                    <Alert severity="error" onClose={handleCloseAlert} sx={{width: '100%'}}>
                        <AlertTitle>{title}</AlertTitle>
                        {body}
                    </Alert>
                </Snackbar>

            </div>

        </div>
    );
});

export default AlertM;
