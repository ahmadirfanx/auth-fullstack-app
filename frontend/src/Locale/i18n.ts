import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    register: {
                        tagline: 'Register with email',
                        haveAccount: 'Already have an account?',
                        createSuccess: 'Account Created',
                        creationMailSent: 'An activation email has been sent to you,',
                        couldNotBeCreated: 'Account could not be'
                    },
                    login: {
                        tagline: 'Enter your email and password to login',
                        dontHaveAccount: 'Don\'t have an account?',
                        loginFailed: 'Login Failed',
                        invalidCredentials: 'Invalid login credentials'
                    },
                    form: {
                        name: 'Full Name',
                        email: 'Email',
                        password: 'Password'
                    },
                    common: {
                        add: 'Add',
                        edit: 'Update',
                        delete: 'Delete',
                        cancel: 'Cancel',
                        view: 'View',
                        success: 'Success',
                        allRecords: 'All Records',
                        recordDetails: 'Record Details',
                        tryAgain: 'Please try again later',
                        somethingWentWrong: 'Something went wrong',
                        createSuccess: 'Record created successfully',
                        editSuccess: 'Record updated successfully',
                        deleteSuccess: 'Record deleted successfully',
                        genericSuccess: 'Operation completed successfully',
                    },
                    module: {
                        register: 'Register',
                        login: 'Login',
                    },
                }
            },
            de: {
                translation: {
                    description: {
                        part1: 'Ändere <1>src/App.js</1> und speichere um neu zu laden.',
                        part2: 'Lerne React'
                    }
                }
            }
        }
    });

export default i18n;
