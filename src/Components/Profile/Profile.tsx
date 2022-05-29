import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {EDIT_USER_SUCCEED} from "../../Redux/User/User-constants";
import {Button, Divider, Paper, TextField, Typography} from "@mui/material";
import {ProfileStyles} from "./ProfileStyles";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import AlertComponent from "../Alerts/SuccessAlert";

export default function Profile() {

    const dispatch = useDispatch()
    const classes = ProfileStyles()
    const [data, setData] = useState({showEditMode: false, email: ''})
    const userData = useSelector((rootState: IRootState) => rootState.user.user)

    const updateUser = () => dispatch({type: EDIT_USER_SUCCEED, payload: {...userData, mail: data.email}})

    return (
        <Paper elevation={6}
               style={{
                   width: '800px',
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
            <AlertComponent/>
            <Typography style={{margin: '5px'}} variant="h5" component="h2">
                {localStorage.getItem('role')}
            </Typography>
            <div style={{display: 'flex', marginTop: '15%', justifyContent: 'center'}}>
                <div>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Фамилия:
                        </Typography>
                        <Typography style={{width: '350px'}} variant="h5" component="h2">
                            {userData?.surname}
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Имя:
                        </Typography>
                        <Typography style={{width: '350px'}} variant="h5" component="h2">
                            {userData?.name}
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Отчество:
                        </Typography>
                        <Typography style={{width: '350px'}} variant="h5" component="h2">
                            {userData?.middleName}
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Логин:
                        </Typography>
                        <Typography style={{width: '350px'}} variant="h5" component="h2">
                            {userData?.login}
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Почта:
                        </Typography>

                        {!data.showEditMode &&
                        <div style={{display: 'flex', alignItems: 'center', width: '350px'}}>
                            <Typography style={{marginRight: '20px'}} variant="h5" component="h2">
                                {userData?.mail}
                            </Typography>
                            <Button onClick={() => setData({...data, showEditMode: true})}
                                    className={classes.iconButton} variant={'outlined'}>
                                <EditOutlinedIcon/>
                            </Button>
                        </div>

                        }

                        {data.showEditMode &&
                        <div style={{display: 'flex', alignItems: 'center', width: '350px'}}>
                            <TextField
                                value={data.email}
                                style={{marginRight: '20px'}}
                                size={'small'}
                                placeholder={'Почта'}
                                label={'Почта'}
                                onChange={(e) => setData({...data, email: e.target.value})}
                            />
                            <Button onClick={() => {
                                updateUser();
                                setData({...data, showEditMode: false})
                            }}
                                    className={classes.iconButton} variant={'outlined'}>
                                <AddIcon/>
                            </Button>
                        </div>

                        }

                    </div>
                    <Divider/>
                    <div className={classes.profileItem}>
                        <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                            Пароль:
                        </Typography>
                        <div style={{display: 'flex', alignItems: 'center', width: '350px'}}>
                            <Typography style={{marginRight: '20px'}} variant="h5" component="h2">
                                **********
                            </Typography>
                            <Button variant={'outlined'} className={classes.iconButton}>
                                <EditOutlinedIcon/>
                            </Button>
                        </div>

                    </div>
                    <Divider/>
                </div>
            </div>
        </div>

        }
        </Paper>)
}
