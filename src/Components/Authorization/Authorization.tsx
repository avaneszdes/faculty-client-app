import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import links from '../../Constants/Constants'
import Grid from '@material-ui/core/Grid';
// @ts-ignore
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import AlertComponent from "../Alerts/SuccessAlert";
import { AUTHORIZATION_SUCCEED} from "../../Redux/Auth/Auth-constants";
import axios from "axios";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED, SET_ALERT_MESSAGE_SUCCEED} from "../../Redux/Alert/Alert-constants";
import history from "../History/history";
import {GET_USER_BY_ID} from "../../Redux/User/User-constants";
import {GET_ALL_EVENTS_BY_USER_ID} from "../../Redux/Calendar/Calendar-constants";
import {GET_DOCUMENT_TYPES} from "../../Redux/Document/Document-constants";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: '21vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const vScheme = yup.object().shape({
    password: yup.string().required("Required"),
    login: yup.string().required("Required"),
})

export interface AuthenticationDto {
    login: string
    password: string
}

export default function SignIn() {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const classes = useStyles()
    const initValues: AuthenticationDto = {
        login: '',
        password: ''
    }


    const [inputEditHideBtn, setInputEditHideBtn] = useState(false)
    const formik = useFormik({
        initialValues: initValues,
        validationSchema: vScheme,
        onSubmit(values: AuthenticationDto) {

            dispatch({type: LOADING_START_SUCCEED, payload: true})
            axios.post(links.authorize,
                values,
                {headers: {"Access-Control-Allow-Origin": "*"}})
                .then(function (response) {
                    localStorage.setItem('role', response.data.role)
                    localStorage.setItem('userId', response.data.userId)

                    if (response.data.role === 'ADMIN'){
                        dispatch({type: AUTHORIZATION_SUCCEED, payload: { role: response.data.role , id: response.data.userId}})
                        history.push('/base-logic-page')
                    }else if(response.data.role === 'STUDENT'){
                        dispatch({type: AUTHORIZATION_SUCCEED, payload: { role: response.data.role , id: response.data.userId}})
                        history.push('/student-base-logic-page')
                    }else if(response.data.role === 'zav'){
                        dispatch({type: AUTHORIZATION_SUCCEED, payload: { role: response.data.role , id: response.data.userId}})
                        history.push('/profile')
                    }
                    dispatch({type: GET_DOCUMENT_TYPES, payload: ''})
                    dispatch({type: GET_USER_BY_ID, payload: response.data.userId})
                    dispatch({type: GET_ALL_EVENTS_BY_USER_ID, payload: response.data.userId})
                })
                .catch(function (error) {
                    dispatch({type: SET_ALERT_MESSAGE_SUCCEED, payload: { message:  error.message, type: false}})
                });
            dispatch({type: LOADING_END_SUCCEED, payload: false})

        },
    })

    const handleClose = () => {
        setInputEditHideBtn(!inputEditHideBtn);
    }

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: '70px'}}>
            <AlertComponent/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('authorization.signInHeader')}
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label={t('authorization.labelLogin')}
                        name={t('authorization.login')}
                        autoComplete="login"
                        autoFocus
                        onChange={formik.handleChange}
                        error={formik.touched.login && Boolean(formik.errors.login)}
                        value={formik.values.login}
                        helperText={formik.touched.login && formik.errors.login}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name={t('authorization.password')}
                        label={t('authorization.labelPassword')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        value={formik.values.password}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        id={"signIn"}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {t('authorization.signInButton')}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" onClick={handleClose} variant="body2">
                                {t('authorization.forgotPasswordLink')}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>

    )
}
