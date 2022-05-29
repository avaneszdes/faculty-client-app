import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Button, Menu, MenuItem, Paper} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {
    DELETE_DOCUMENT_BY_ID,
    GET_DOCUMENTS_BY_USER_ID,
    UPLOAD_DOCUMENT
} from "../../Redux/Document/Document-constants";
import { useEffect, useState } from "react";
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import axios from "axios";
import {IDocumentType} from "../../Redux/Document/Document-interfaces";


const fileDownload = require('js-file-download');


export default function UploadDocumentsAccordion() {

    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const user = useSelector((x: IRootState) => x.user.user)
    const open = Boolean(anchorEl);
    const [documentType, setDocumentType] = useState<IDocumentType | null>(null)
    const docTypes = useSelector((root: IRootState) => root.document.documentTypes)
    const files = useSelector((root: IRootState) => root.document)

    useEffect(() => {
        if (user?.id !== undefined) {
            dispatch({type: GET_DOCUMENTS_BY_USER_ID, payload: user?.id})
        }
    }, [user]);

    const imageHandler = (e: any) => {

        if (e.target.files[0] !== null) {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            dispatch({
                type: UPLOAD_DOCUMENT,
                payload: {userId: user?.id, file: formData, docTypeId: documentType?.id, practiceId: user?.practiceId}
            })
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const setTypeAndClose = (type: IDocumentType) => {
        setAnchorEl(null)
        setDocumentType(type)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };


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

    const deleteDocument = (id: number) => {
        dispatch({type: DELETE_DOCUMENT_BY_ID, payload: id})
    }

    return <Accordion style={{backgroundColor: '#dfe7f8'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography component={'h2'} variant={'h6'}>Загрузить документ</Typography>
        </AccordionSummary>
        <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>

            {docTypes && <div style={{display: 'flex', alignItems: 'center'}}>
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
                    {docTypes.map(x => <MenuItem key={x.id} onClick={() => setTypeAndClose(x)}>{x.type}</MenuItem>)}
                </Menu>

                <Typography style={{marginLeft: '10px'}} component={'span'} variant={'body2'}>{documentType?.type}</Typography>
            </div>}


            {Boolean(documentType) && <div style={{display: 'flex', marginTop: '20px'}}>
                <div style={{width: '100%'}}>
                    <input
                        accept="*"
                        style={{display: 'none'}}
                        id="raised-button-file"
                        multiple
                        onChange={imageHandler}
                        type="file"
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="outlined" component="span" fullWidth={true}>
                            Загрузить файл
                        </Button>
                    </label>
                </div>
            </div>}

            {Boolean(files.documents.length) && <Typography style={{marginTop: '30px'}} component={'h2'} variant={'h6'}>Загруженные документы</Typography>}
            {files && <div>
                {files.documents.map(x =>
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


        </AccordionDetails>
    </Accordion>
}


