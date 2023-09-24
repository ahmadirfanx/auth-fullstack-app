// @ts-nocheck
import React, { useRef } from 'react';
import { Button, Card, CardContent, TextField, Typography, Box, FormControl, Divider } from "@mui/material";
import { Typewriter, useTypewriter, Cursor } from 'react-simple-typewriter'
import { useStyles } from './Styles';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../../../index.scss';
import { useTranslation, Trans } from 'react-i18next';
import { useForm } from "react-hook-form";
import { post } from "../../../../Services/GenericApiService";
import AlertM from "../../../Helpers/AlertM/AlertM";
import { encrypt } from "../../../../Services/CryptoService";
import { getUserData, storeJWT } from "../../../../Services/LocalStorageService";
import { login } from "./Actions";
import GoogleSSO from "../SSO/GoogleSSO/GoogleSSO";
import { InputAdornment, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';

// font awesome stuff
const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix")
    .map(icon => Icons[icon])

library.add(...iconList)



const Fade = require("react-reveal/Fade")
const Reveal = require("react-reveal/Reveal")


function Login() {
    // styles
    const classes = useStyles();

    // router
    const navigate = useNavigate();

    // translation
    const { t } = useTranslation();

    // child ref for alert
    const notifications = useRef();

    // module(s) for api
    const moduleMain = 'auth/login';

    // state in redux
    const authentication = useSelector(
        (state: RootStateOrAny) => state.authentication,
    );

    // Dispatcher
    const dispatch = useDispatch()

    // form data
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm(); // watch is used to get the value e.g watch("name")

    // data vars
    const [showPassword, setShowPassword] = React.useState(false);

    // ui controls
    const [loading, setLoading] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // authentication methods
    const onLogin = (_data: any) => {
        setLoading(true); // show loader

        // encrypt data
        _data.password = encrypt(_data.password)

        post(moduleMain, _data)
            .then(_res => {
                setLoading(false); // hide loader
                storeJWT(_res.token)
                const userdata = getUserData();
                dispatch(login(true, _res.token, userdata));
                navigate('/dashboard');
            })
            .catch(_err => {
                setLoading(false); // hide loader
                // @ts-ignore
                notifications.current.errorAlert(t('login.loginFailed'), t('login.invalidCredentials'));
            })
    }

    return (
        <section className="full-width h-100">
            <div className="row h-100">
                <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="px-md-0 px-4">

                            <div className="col-md-12 mx-md-2 mx-0">
                                <h2>{t('module.login')}</h2>
                                <p>{t('login.tagline')}</p>
                            </div>

                            <form className="row px-2" onSubmit={handleSubmit(onLogin)}>

                                {/* Field Email */}
                                <div className="col-md-12 mt-4">
                                    <FormControl fullWidth>
                                        <TextField id="emailInput"
                                            {...register("email", { required: true })}
                                            label={t('form.email')}
                                            type={"email"}
                                            error={!!errors.email}
                                            variant="outlined"
                                            className="full-width" />
                                    </FormControl>
                                </div>

                                {/* Field Password */}
                                <div className="col-md-12 mt-4">
                                    <FormControl fullWidth>
                                        <TextField id="passwordInput"
                                            {...register("password", { required: true })}
                                            label={t('form.password')}
                                            type={showPassword ? "text" : "password"}
                                            error={!!errors.password}
                                            variant="outlined"
                                            className="full-width"
                                            InputProps={{ // <-- This is where the toggle button is added.
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                        >
                                                            {showPassword ? <FontAwesomeIcon width={'1em'} icon='eye' /> : <FontAwesomeIcon width={'1em'} icon='eye-slash' />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }} />
                                    </FormControl>
                                </div>

                                {/* Submit Button */}
                                <div className="col-md-12 mt-4">
                                    <Button type="submit"
                                        variant="contained"
                                        className={'bg-custom-gradient my-2 py-3 full-width'}>
                                        {t('module.login')}
                                    </Button>
                                </div>

                            </form>



                            <div className="col-md-12 m-2">
                                <p className="my-2">
                                    {t('login.dontHaveAccount')}&nbsp;
                                    <Button className="fw-bolder text-theme-dark" onClick={() => navigate('/register')}>
                                        {t('module.register')}
                                    </Button>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-6 my-auto">
                    <div className="justify-content-center text-center">
                        <h2>Welcome!</h2>
                        <p className="mb-4">
                            Good to see you here 😁
                        </p>
                        <img className="img-fluid"
                            src={require('../../../../Assets/img/login-screen.jpg')} width="70%" />
                    </div>
                </div>

            </div>


            <AlertM ref={notifications} />

        </section>
    );
}


export default Login;
