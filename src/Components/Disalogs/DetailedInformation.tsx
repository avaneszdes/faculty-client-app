import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {Divider, IconButton, TextField, Typography} from "@mui/material";
import {useState} from "react";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import {IStudent} from "../../Redux/Faculty/Faculty-interfaces";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {ProfileStyles} from "../Profile/ProfileStyles";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    close: (isOpen: boolean) => void
    isOpen: boolean
    userData: IStudent
}

export default function DetailedActionDialog({close, isOpen, userData}: Props) {

    const [comment, setComment] = useState('')
    const classes = ProfileStyles()

    return <Dialog
        BackdropProps={{
            style: {
                opacity: 0.5,
                filter: 'alpha(Opacity=70)'
            }
        }}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => close(false)}
    >
        <DialogTitle>ДЕТАЛЬНАЯ ИНФОРМАЦИЯ</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
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
                                {userData?.username}
                            </Typography>
                        </div>
                        <Divider/>
                    </div>
                </div>

                <TextField
                    multiline={true}
                    minRows={5}
                    value={comment}
                    style={{margin: '10px', width: '400px'}}
                    size={'small'}
                    placeholder={'Коментарий к практике'}
                    label={'Коментарий к практике'}
                    onChange={(e) => setComment(e.target.value)}
                    InputProps={{endAdornment: <Button ><SendOutlinedIcon/></Button>}}
                />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => close(false)}>Закрыть</Button>
        </DialogActions>
    </Dialog>
}
