import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {GET_USER_BY_LOGIN_SUCCEED} from "../../Redux/User/User-constants";
import {Button, Divider, Paper, Typography} from "@mui/material";
import {ProfileStyles} from "./ProfileStyles";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Profile() {

    const dispatch = useDispatch()
    const classes = ProfileStyles()
    const userData = useSelector((rootState: IRootState) => rootState.user.user)

    useEffect(() => {
        dispatch({
            type: GET_USER_BY_LOGIN_SUCCEED, payload: {
                id: 1,
                name: "Владислав",
                surname: "Аванесов",
                middleName: "2",
                username: "avaneszdes@gmail.com",
                mail: '123123',
                role: "ЗАВ КАФЕДРОЙ",
                practiceId: 1,
                groupId: 1,
            }
        })
    }, []);

    return (
        <Paper elevation={6}
            style={{
                width: '700px',
                height: '600px',
                borderRadius: '5px',
                backgroundColor: '#bbeec6',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >{userData &&
        <div>
            <Typography style={{margin: '5px'}} variant="h5" component="h2">
                {userData.role}
            </Typography>
            <div style={{display: 'flex', marginTop: '15%', justifyContent: 'center'}}>
                <div>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Фамилия:
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {userData?.surname}
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Имя:
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {userData?.name}
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Отчество:
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {userData?.middleName}
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Логин:
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {userData?.login}
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Почта:
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {userData?.mail}
                        </Typography>
                        <Button className={classes.iconButton} variant={'outlined'}>
                            <EditOutlinedIcon  />
                        </Button>
                    </div>
                    <Divider/>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Пароль:
                        </Typography>
                        <Typography variant="h5" component="h2">
                            **********
                        </Typography>
                        <Button variant={'outlined'} className={classes.iconButton}>
                            <EditOutlinedIcon/>
                        </Button>
                    </div>
                    <Divider/>
                </div>
            </div>
        </div>

        }
        </Paper>)
}
