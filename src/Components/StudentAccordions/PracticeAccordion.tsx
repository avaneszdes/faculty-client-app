import AccordionSummary from "@mui/material/AccordionSummary";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Button, Divider, InputAdornment, Menu, MenuItem, Paper, TextField} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useEffect, useState} from "react";
import {IPracticeLocationInterface} from "../../Redux/Practice/Practice-interfaces";
import EditIcon from '@mui/icons-material/Edit';
import EditOffRoundedIcon from '@mui/icons-material/EditOffRounded';
import {IRootState} from "../../Redux/configureStore";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_DOCUMENT_BY_ID, UPLOAD_DOCUMENT} from "../../Redux/Document/Document-constants";
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import axios from "axios";

const fileDownload = require('js-file-download');

interface Props {
    addPracticeLocation: (place: string) => void
    updatePracticeLocation: (practice: IPracticeLocationInterface) => void
}

export default function PracticeAccordion({addPracticeLocation, updatePracticeLocation}: Props) {

    const practiceLocation = useSelector((x: IRootState) => x.practice.practiceLocation) as IPracticeLocationInterface
    const files = useSelector((root: IRootState) => root.document)
    const user = useSelector((x: IRootState) => x.user.user)
    const [practicePlace, setPracticePlace] = useState(practiceLocation?.location ?? '')
    const [disable, setDisable] = useState(true)
    const [documentType, setDocumentType] = useState<null | number>(null)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setPracticePlace(practiceLocation?.location ?? '')
    }, [disable, user]);

    const isPracticePlaceExist = !Boolean(practiceLocation) && practiceLocation?.location === undefined

    const update = (practiceLocation: IPracticeLocationInterface) => {
        if (practicePlace !== '') {
            updatePracticeLocation(practiceLocation)
        }
        setDisable(true);
        setPracticePlace(practicePlace)
    }

    const setInputEditable = () => {
        setPracticePlace('')
        setDisable(false)
    }

    const deleteDocument = (id: number) => {
        dispatch({type: DELETE_DOCUMENT_BY_ID, payload: id})
    }

    const downloadFile = (id: number, fileName: string) => {

        axios({
            url: "https://docker-heroku-demo-01.herokuapp.com/download/" + id,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            fileDownload(response.data, fileName.slice(62, fileName.length));
        }).catch((response) => {
            alert(response);
        });
    }

    const imageHandler = (e: any) => {

        if (e.target.files[0] !== null) {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            dispatch({
                type: UPLOAD_DOCUMENT,
                payload: {userId: user?.id, file: formData, docTypeId: documentType, practiceId: user?.practiceId}
            })
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const setTypeAndClose = (id: number) => {
        setAnchorEl(null)
        setDocumentType(id)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };


    return <Accordion style={{backgroundColor: '#dff8df'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel2a-content"
            id="panel2a-header"
        >
            <Typography component={'h2'} variant={'h5'}>Управление своей практикой</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div>
                <TextField
                    disabled={!isPracticePlaceExist && practicePlace !== ''}
                    size={'small'}
                    placeholder={'Место практики'}
                    label={'Место практики'}
                    id='practicePlace'
                    fullWidth={true}
                    value={practicePlace}
                    onChange={(e) => setPracticePlace(e.target.value)}
                    error={!Boolean(practicePlace) && practiceLocation?.location === ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment variant={'filled'} position="end">
                                {!isPracticePlaceExist && practicePlace !== '' ?
                                    <EditOffRoundedIcon
                                        onClick={setInputEditable}
                                        color={'success'}
                                    />
                                    :
                                    <EditIcon
                                        color={'success'}
                                        onClick={() => update({
                                            ...practiceLocation as IPracticeLocationInterface,
                                            location: practicePlace
                                        })}
                                    />}
                            </InputAdornment>
                        ),
                    }}
                />

                {isPracticePlaceExist
                && <Button variant={'outlined'} onClick={() => addPracticeLocation(practicePlace)}
                           endIcon={<AddOutlinedIcon/>}
                           style={{marginTop: '10px'}}
                >
                    <Typography component={'span'} variant={'body2'}>Установить</Typography>
                </Button>}

            </div>

            <Divider variant='fullWidth' style={{marginTop: '20px'}}/>
            <div>
                <Typography style={{marginTop: '30px'}} component={'h2'} variant={'h6'}>Загрузить файл</Typography>
                {files.documentTypes && <div style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                    <Button
                        variant={'outlined'}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Тип документа
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {files.documentTypes.map(x => <MenuItem key={x.id}
                                                                onClick={() => setTypeAndClose(x.id)}>{x.type}</MenuItem>)}
                    </Menu>

                </div>}
                {<div style={{width: '100%', marginTop: '10px'}}>
                    <input
                        accept="*"
                        style={{display: 'none'}}
                        id="raised-button-file"
                        multiple
                        onChange={imageHandler}
                        type="file"
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" disabled={!Boolean(typeof documentType === 'number')}
                                component="span" fullWidth={true}>
                            Загрузить файл практики
                        </Button>
                    </label>
                </div>}

                <Divider variant='fullWidth' style={{marginTop: '20px'}}/>

                {files.documents.length > 0 && <Typography style={{marginTop: '30px'}} component={'h2'} variant={'h6'}>Скачать документы</Typography>}
                {files && <div>
                    {files.documents.map(x =>
                        <div key={x.id} style={{margin: '15px 0px 0px 20px ', display: 'flex', alignItems: 'center'}}>
                            <Paper style={{padding: '8px 15px 8px 15px'}} elevation={10}>
                                {x.filename.length > 50 ? x.filename.slice(62, x.filename.length) : x.filename}
                            </Paper>
                            <Button
                                style={{margin: '0px 15px 0px 15px'}}
                                variant={'contained'}
                                endIcon={<DownloadForOfflineRoundedIcon fontSize={'large'}/>}
                                onClick={() => downloadFile(x.id, x.filename)}
                            >
                                Скачать
                            </Button>
                            <Button
                                onClick={() => deleteDocument(x.id)}
                                variant={'contained'}
                                endIcon={<DeleteForeverRoundedIcon fontSize={'large'}/>}
                            >
                                Удалить
                            </Button>

                        </div>
                    )}

                </div>}
            </div>

        </AccordionDetails>
    </Accordion>
}

