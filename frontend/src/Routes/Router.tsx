import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import { useTranslation, Trans } from 'react-i18next';
import { AuthGuard } from "./Guards/AuthGuard/AuthGuard";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getTheme } from '../Services/ThemeService';

// Import components
import Login from "../Components/Screens/Authentication/Login/Login";
import Register from "../Components/Screens/Authentication/Register/Register";
import Home from "../Components/Screens/Dashboard/Home/Home"
import Logout from "../Components/Screens/Authentication/Logout/Logout";

function Router() {
      const { t, i18n } = useTranslation();

      // get current theme
      const theme = useSelector(
            (state: RootStateOrAny) => state.global.global.theme,
      );

      return (
            <ThemeProvider theme={getTheme(theme)}>
                  <BrowserRouter>
                        {/*<Header/>*/}
                        <Routes>
                              <Route path="/" element={<AuthGuard />}>
                                    <Route path="/" element={<Home />} />
                              </Route>
                              <Route path="/login" element={<Login />} />
                              <Route path="/register" element={<Register />} />
                              <Route path="/logout" element={<Logout />} />
                              <Route path="/dashboard" element={<AuthGuard />}>
                                    <Route path="/dashboard" element={<Home />} />
                              </Route>
                        </Routes>
                  </BrowserRouter>
            </ThemeProvider>
      );
}

export default Router;
