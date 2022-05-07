import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
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
import {SET_ALERT_MESSAGE_SUCCEED} from "../../Redux/Alert/Alert-constants";
import history from "../History/history";


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

            if (values.login === 'admin'){
                dispatch({type: AUTHORIZATION_SUCCEED, payload: { role: 'ADMIN' , id: 1}})
                history.push('/base-logic-page')
            }else if(values.login === 'student'){
                dispatch({type: AUTHORIZATION_SUCCEED, payload: { role: 'STUDENT' , id: 2}})
                history.push('/profile')
            }else if(values.login === 'zav'){
                dispatch({type: AUTHORIZATION_SUCCEED, payload: { role: 'STUDENT' , id: 2}})
                history.push('/profile')
            }
            // axios.post('http://localhost:8080/diplom-web/login',
            //     values,
            //     {headers: {"Access-Control-Allow-Origin": "*"}})
            //     .then(function (response) {
            //         localStorage.setItem('role', response.data.user_role)
            //         localStorage.setItem('userId', response.data.user_id)
            //
            //
            //
            //
            //         // if(response.data.user_role === 'ADMIN'){
            //         //     history.push('/base-logic-page')
            //         // }else if (response.data.user_role === 'STUDENT'){
            //         //     history.push('/profile')
            //         // }
            //
            //
            //     })
            //     .catch(function (error) {
            //         dispatch({type: SET_ALERT_MESSAGE_SUCCEED, payload: { message:  error.message, type: false}})
            //     });
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
