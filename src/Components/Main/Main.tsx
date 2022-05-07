import React, {useEffect, useState} from "react";
import Authorization from "../Authorization/Authorization"
import {Route, Routes} from 'react-router-dom';
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import history from "../History/history";
import {useTranslation} from "react-i18next";
import '../../i18next/i18n'
import {Menu, MenuItem} from "@material-ui/core";
import './main.css'
import {IRootState} from "../../Redux/configureStore";
import {useDispatch, useSelector} from "react-redux";
import logoBntu from '../../images/LogoBntu2.png'
import BaseLogicPage from "../BasePage/BaseLogicPage";
import {Box, Divider, Modal} from "@mui/material";
import Calendar from "../Calendar/Calendar";
import {LOG_OUT} from "../../Redux/Auth/Auth-constants";
import Profile from "../Profile/Profile";

const useStyles = makeStyles((theme) => ({
    '@global': {
        body: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: '#d4d4d4',
        height: '60px',
        marginBottom: '-5px',
        position: 'fixed'
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    logo: {
        marginLeft: '10px',
        paddingLeft: '10px',
        cursor: "pointer",
    }
}));

const style = {
    position: 'absolute' as 'absolute',
    top: '49%',
    left: '49%',
    transform: 'translate(-49%, -49%)',
    width: '100%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid green',
    boxShadow: 24,
    p: 4,
};


export default function Main() {

    const classes = useStyles()
    const {t, i18n} = useTranslation();
    const auth = useSelector((profile: IRootState) => profile.auth)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        if (auth.role === null) {
            localStorage.setItem('role', '')
            history.push("/")
        }
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const home = () => history.push('/')
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
    const handleLanguageClose = (lang: string) => {
        if (lang === 'ru' || lang === 'zh' || lang === 'en') {
            i18n?.changeLanguage(lang);
        }
        setAnchorEl(null)
    }

    const logIn = () => {
        console.log(auth.role)
        if(auth.role === 'ADMIN'){
            history.push('/base-logic-page')
        }else if (auth.role === 'STUDENT'){
            history.push('/profile')
        }

    }

    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }

    const logOut = () => {
        localStorage.removeItem('role');
        dispatch({type: LOG_OUT, payload: ''})
        history.push("/")
    }


    return (<div>
            <AppBar style={{height: `${windowDimensions.height > 1300 ? '80px' : '60px'}`, position: 'fixed'}}
                    color="default" elevation={0} className={classes.appBar}>
                <div onClick={() => home()} className={classes.logo}>
                    <img alt={'img'} src={logoBntu} width={50} height={50}/>
                </div>

                <Toolbar>

                    {!auth.role &&
                    <h5 className="fromLeft" onClick={() => logIn()}>
                        {t('main.logIn')}
                    </h5>}

                    <Divider orientation="vertical" flexItem sx={{height: '20px', marginTop: '20px'}} />
                    <h5 className="fromLeft" onClick={() => history.push('/base-logic-page')}>
                        {t('main.basePage')}
                    </h5>
                    <Divider orientation="vertical" flexItem sx={{height: '20px', marginTop: '20px'}}/>
                    <h5 className="fromLeft" onClick={() => history.push('/profile')}>
                        {t('main.personalAccount')}
                    </h5>
                    <Divider orientation="vertical" flexItem sx={{height: '20px', marginTop: '20px'}} />

                    <h5 className="fromLeft" onClick={handleOpen}>
                        {t('main.calendar')}
                    </h5>

                    <Divider orientation="vertical" flexItem sx={{height: '20px', marginTop: '20px'}} />
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Calendar/>
                        </Box>
                    </Modal>

                    {auth.role &&
                        <h5 className="fromLeft" onClick={() => logOut()}>
                            {t('main.logOut')}
                        </h5>
                    }

                    <div>
                        <Button aria-controls="simple-menu" style={{all: 'unset'}}
                                aria-haspopup="listbox" onClick={handleLanguageClick}>
                            <h5 className="fromLeft">{t('main.language')}</h5>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleLanguageClose}
                        >
                            <MenuItem onClick={() => handleLanguageClose('en')}>{t('language.en')}</MenuItem>
                            <MenuItem onClick={() => handleLanguageClose('ru')}>{t('language.ru')}</MenuItem>
                            <MenuItem onClick={() => handleLanguageClose('zh')}>{t('language.zh')}</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<Authorization/>}/>
                <Route path="/base-logic-page" element={<BaseLogicPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </div>
    );
}
