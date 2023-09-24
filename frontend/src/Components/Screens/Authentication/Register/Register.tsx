import React from 'react';
import { Button, Card, CardContent, TextField, Typography, Box, Snackbar, Alert, AlertTitle } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { Typewriter, useTypewriter, Cursor } from 'react-simple-typewriter'
import { useStyles } from './Styles';
import { useNavigate } from 'react-router-dom';
import { post } from '../../../../Services/GenericApiService';
import { useForm } from "react-hook-form";
import '../../../../index.scss';
import { useTranslation, Trans } from 'react-i18next';

function Register() {
    const classes = useStyles();
    const navigate = useNavigate();
    const module = 'auth/signup';
    const { t } = useTranslation();

    // form data
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm(); // watch is used to get the value e.g watch("name")

    // ui controls
    const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
    const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [passwordValidation, setPasswordValidation] = React.useState({
        minLength: false,
        hasLetter: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const handleFormReset = () => reset();

    const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
    };

    const loginRedirect = () => {
        // Redirect to /login after 3 seconds
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    }

    const onSubmit = (_data: any) => {
        setLoading(true); // show loader
        post(module, _data)
            .then(_res => {
                console.log(_res)
                setLoading(false); // hide loader
                setOpenSuccessAlert(true);  // show success alert
                handleFormReset();
                loginRedirect();
            })
            .catch(_err => {
                console.log(_err.response.data);
                setLoading(false); // hide loader
                setOpenErrorAlert(true);  // show error alert
            })
    }

    const validatePassword = (password: string) => {
        const minLength = password.length >= 8;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        setPasswordValidation({
            minLength,
            hasLetter,
            hasNumber,
            hasSpecialChar,
        });

        return minLength && hasLetter && hasNumber && hasSpecialChar;
    }

    const isSubmissionValid = () => {
        return (passwordValidation.minLength &&
            passwordValidation.hasLetter &&
            passwordValidation.hasNumber &&
            passwordValidation.hasSpecialChar)
    }

    return (
        <section className="full-width h-100">
            <div className="row h-100">

                {/* Content Div */}
                <div className="col-md-4 mx-auto">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="px-md-0 px-4">

                            <h2>{t('module.register')}</h2>
                            {/* <p>{t('register.tagline')}</p> */}
                            <form className="row px-2" onSubmit={handleSubmit(onSubmit)}>

                                <TextField id="nameInput"
                                    {...register("name", { required: true })}
                                    label={t('form.name')}
                                    type={"name"}
                                    error={!!errors.name}
                                    variant="outlined"
                                    className="full-width my-2" />

                                <TextField id="emailInput"
                                    {...register("email", { required: true })}
                                    label={t('form.email')}
                                    type={"email"}
                                    error={!!errors.email}
                                    variant="outlined"
                                    className="full-width my-2" />

                                <TextField id="passwordInput"
                                    {...register("password", { required: true })}
                                    label={t('form.password')}
                                    type={"password"}
                                    error={!!errors.password}
                                    variant="outlined"
                                    className="full-width my-2"
                                    onChange={(e) => validatePassword(e.target.value)} />



                                <div className="my-2">
                                    {!passwordValidation.minLength && (
                                        <Typography variant="subtitle2" component="div" className="">
                                            {'• Password must be at least 8 characters long.'}
                                        </Typography>
                                    )}
                                    {!passwordValidation.hasLetter && (
                                        <Typography variant="subtitle2" component="div" className="">
                                            {'• Password must contain at least 1 letter.'}
                                        </Typography>

                                    )}
                                    {!passwordValidation.hasNumber && (
                                        <Typography variant="subtitle2" component="div" className="">
                                            {'• Password must contain at least 1 number.'}
                                        </Typography>
                                    )}
                                    {!passwordValidation.hasSpecialChar && (
                                        <Typography variant="subtitle2" component="div" className="">
                                            {'• Password must contain at least 1 special character.'}
                                        </Typography>
                                    )}
                                </div>


                                <LoadingButton loading={loading}
                                    type="submit"
                                    disabled={!isSubmissionValid()}
                                    variant="contained"
                                    className="my-2 py-3 ">
                                    {t('module.register')}
                                </LoadingButton>

                            </form>
                            <p className="my-2">
                                {t('register.haveAccount')}&nbsp;
                                <Button className="fw-bolder text-theme-dark" onClick={() => navigate('/login')}>
                                    {t('module.login')}
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>


                <div className="col-md-6 my-auto">
                    <div className="justify-content-center text-center">
                        <h2>Let's Get you registered</h2>
                        <p className="mb-4">
                            Fill in your basic information.
                        </p>
                        <img className="img-fluid"
                            src={require('../../../../Assets/img/form.png')} width="70%" />
                    </div>
                </div>
            </div>

            {/* Success Alert */}
            <Snackbar open={openSuccessAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity="success" onClose={handleCloseAlert} sx={{ width: '100%' }}>
                    <AlertTitle>{t('register.createSuccess')}</AlertTitle>
                </Alert>
            </Snackbar>

            {/* Error Alert */}
            <Snackbar open={openErrorAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity="error" onClose={handleCloseAlert} sx={{ width: '100%' }}>
                    <AlertTitle>{t('common.somethingWentWrong')}</AlertTitle>
                    {t('register.couldNotBeCreated')}
                </Alert>
            </Snackbar>
        </section>
    );
}


export default Register;
