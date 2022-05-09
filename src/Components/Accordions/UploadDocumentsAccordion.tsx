import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Button, Menu, MenuItem} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {UPLOAD_DOCUMENT_SUCCEED} from "../../Redux/Faculty/Faculty-constants";
import {IRootState} from "../../Redux/configureStore";
import axios from "axios";


export default function UploadDocumentsAccordion() {

    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [documentType, setDocumentType] = React.useState('')
    const document = useSelector((root: IRootState) => root.document)

    const imageHandler = (e: any) => {

        if (e.target.files[0] !== null) {
            const formData = new FormData();
            formData.append(e.target.files[0].name, e.target.files[0]);


            axios.post(
                'http://localhost:8080/diplom-web/fileupload',
                formData, {headers: {"Content-type": "multipart/form-data"}}
            ).then(res => {
                console.log(`Success` + res.data);
            }).catch(err => {
                console.log(err);
            })

            dispatch({type: UPLOAD_DOCUMENT_SUCCEED, payload: {documentType: documentType, document: formData}})
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const setTypeAndClose = (type: string) => {
        setAnchorEl(null)
        setDocumentType(type)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };


    const fileDownload = () => {

    }

    return <Accordion style={{backgroundColor: '#dfe7f8'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography>Загрузить документ</Typography>
        </AccordionSummary>
        <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>

            <div style={{display: 'flex', alignItems: 'center'}}>
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
                    <MenuItem onClick={() => setTypeAndClose('Дневник практики')}>Дневник практики</MenuItem>
                    <MenuItem onClick={() => setTypeAndClose('Отчёт практики')}>Отчёт практики</MenuItem>
                </Menu>

                <Typography style={{marginLeft: '10px'}}>{documentType}</Typography>
            </div>


            {documentType !== '' && <div style={{display: 'flex', marginTop: '20px'}}>
                <div style={{width: '100%'}}>
                    <input
                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                text/plain, application/pdf, image/*"
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


        </AccordionDetails>
    </Accordion>
}


