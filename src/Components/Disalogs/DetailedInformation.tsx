import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {Divider,Menu,MenuItem,Paper,TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import {ProfileStyles} from "../Profile/ProfileStyles";
import AlertComponent from "../Alerts/SuccessAlert";
import {IUserInterface} from "../../Redux/User/User-interfaces";
import { useDispatch, useSelector } from 'react-redux';
import {
    GET_COMMENTS_BY_USER_ID,
    SEND_COMMENT
} from "../../Redux/Faculty/Faculty-constants";
import {IRootState} from "../../Redux/configureStore";
import {ICommentInterface} from "../../Redux/Faculty/Faculty-interfaces";
import {GET_DOCUMENTS_BY_USER_ID, UPDATE_FILE_STATUS_BY_ID} from "../../Redux/Document/Document-constants";
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import axios from 'axios';
import MarkMenu from "../AdminBasePage/MarkMenu";
import {EDIT_USER} from "../../Redux/User/User-constants";
import {documentStatuses} from "../../Constants/Constants";
import {IDocument} from "../../Redux/Document/Document-interfaces";
import {convertDocStatus} from "../../Constants/Global";


const fileDownload = require('js-file-download');

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
    userData: IUserInterface
}

export default function DetailedActionDialog({close, isOpen, userData}: Props) {

    const [comment, setComment] = useState('')
    const files = useSelector((x:IRootState) => x.document.documents)
    const user = useSelector((x:IRootState) => x.user.user)
    const comments = useSelector((x:IRootState) => x.faculty.comments)
    const dispatch = useDispatch()
    const classes = ProfileStyles()
    const [mark, setMark] = useState(1)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const openList = Boolean(anchorEl)


    useEffect(() => {
        if(userData){
            dispatch({type: GET_COMMENTS_BY_USER_ID, payload: userData.id})
            dispatch({type: GET_DOCUMENTS_BY_USER_ID, payload: userData.id})
        }
    }, [userData]);


    const sendComment = () => dispatch({type: SEND_COMMENT, payload: {userId: user?.id, comment: comment, receiverId: userData.id}})
    const sendMark = (user: IUserInterface) => dispatch({type: EDIT_USER, payload: user})



    const downloadFile = (id: number, fileName: string) => {
        axios({
            url: "https://docker-heroku-demo-01.herokuapp.com/download/" + id,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            fileDownload(response.data, fileName);
        }).catch((response) => {
            alert(response);
        });
    }


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const setTypeAndClose = (document: IDocument, status: string) => {
        dispatch({type: UPDATE_FILE_STATUS_BY_ID, payload: {id: document.id, status: status}})
        setAnchorEl(null)
    }

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
        maxWidth={'xl'}
        onClose={() => close(false)}
    >
        <AlertComponent/>
        <DialogTitle>ДЕТАЛЬНАЯ ИНФОРМАЦИЯ</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                <div style={{display: 'flex', marginTop: '5%', justifyContent: 'center'}}>
                    <div>
                        <div className={classes.profileItem}>
                            <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                                Фамилия:
                            </Typography>
                            <Typography style={{width: '250px', color: 'black'}} variant="h5" component="h2">
                                {userData?.surname}
                            </Typography>
                        </div>
                        <Divider/>
                        <div className={classes.profileItem}>
                            <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                                Имя:
                            </Typography>
                            <Typography style={{width: '250px', color: 'black'}} variant="h5" component="h2">
                                {userData?.name}
                            </Typography>
                        </div>
                        <Divider/>
                        <div className={classes.profileItem}>
                            <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                                Отчество:
                            </Typography>
                            <Typography  style={{width: '250px', color: 'black'}} variant="h5" component="h2">
                                {userData?.middleName}
                            </Typography>
                        </div>
                        <Divider/>
                        <div className={classes.profileItem}>
                            <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                                Логин:
                            </Typography>
                            <Typography style={{width: '250px', color: 'black'}} variant="h5" component="h2">
                                {userData?.login}
                            </Typography>
                        </div>
                        <Divider/>
                        <div className={classes.profileItem}>
                            <Typography className={classes.profileItemTemplate} variant="h5" component="h2">
                                Оценка:
                            </Typography>
                            <Typography style={{width: '250px', color: 'black'}} variant="h5" component="h2">
                                {userData?.mark}
                            </Typography>
                        </div>
                        <Divider/>
                    </div>
                    <TextField
                        multiline={true}
                        minRows={9}
                        value={comment}
                        style={{margin: '0px 20px 20px 20px', width: '400px', color: 'black'}}
                        size={'small'}
                        placeholder={'Коментарий к практике'}
                        label={'Коментарий к практике'}
                        onChange={(e) => setComment(e.target.value)}
                        InputProps={{endAdornment: <Button onClick={sendComment} ><SendOutlinedIcon/></Button>}}
                    />
                </div>




                {files.length > 0 && <Typography style={{marginTop: '30px', color: 'black'}} component={'h2'} variant={'h6'}>Скачать документы </Typography>}
                {files && <div>
                    {files.map(x =>
                        <div key={x.id} style={{margin: '15px 0px 0px 20px ', display: 'flex', alignItems: 'center'}}>
                            <Paper style={{padding: '8px 15px 8px 15px'}} elevation={10}>
                                {x.filename}
                            </Paper>
                            <Button
                                style={{margin: '0px 15px 0px 15px'}}
                                variant={'contained'}
                                endIcon={<DownloadForOfflineRoundedIcon fontSize={'large'}/>}
                                onClick={() => downloadFile(x.id, x.filename)}
                            >
                                Скачать
                            </Button>

                            <MarkMenu setMark={(mark) => {
                                setMark(mark); sendMark({...userData, mark: mark})
                            }}
                                      isSet={Boolean(mark > 4)}/>

                            <div style={{display: 'flex', alignItems: 'center', margin: '10px'}}>
                                <Button
                                    variant={'contained'}
                                    id="basic-button"
                                    aria-controls={isOpen ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={isOpen ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <Typography component={'span'}>Высталение статуса документа</Typography>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openList}
                                    onClose={handleClose}
                                    MenuListProps={{

                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {documentStatuses.map(a => <MenuItem
                                        key={a}
                                        onClick={() => setTypeAndClose(x, convertDocStatus(a))}
                                    >
                                        {a}
                                    </MenuItem>)}
                                </Menu>
                            </div>
                            </div>)}

                </div>}

                {comments.length && <Typography style={{marginTop: '30px', color: 'black'}} component={'h2'} variant={'h6'}>
                    Комментарии к практике студента
                </Typography>}
                {comments && <div>
                    {comments.map((x: ICommentInterface, index) => <div key={x.id}>{index +1 + ') ' + x.comment}</div>)}
                </div>}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant={'contained'} onClick={() => close(false)}>Закрыть</Button>
        </DialogActions>
    </Dialog>
}
