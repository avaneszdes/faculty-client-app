import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Button} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useDispatch} from "react-redux";
import {UPLOAD_DOCUMENT} from "../../Redux/Faculty/Faculty-constants";


export default function UploadDocumentsAccordion(){

    const dispatch = useDispatch()

    const imageHandler = (target: any) => {

        const reader = new FileReader();
        reader.onload = (e: any) => {
            dispatch({type: UPLOAD_DOCUMENT, payload: e.target.result})
        };

        if (target.target.files[0]) {
            reader.readAsDataURL(target.target.files[0])
        }
    }


    return <Accordion style={{backgroundColor: '#dfe7f8'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography>Загрузить документ</Typography>
        </AccordionSummary>
        <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>

            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                onChange={imageHandler}
                type="file"
            />
            <label htmlFor="raised-button-file">
                <Button variant="outlined" component="span" fullWidth={true} >
                    Документ о преддипломной практике
                </Button>
            </label>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                onChange={imageHandler}
                type="file"
            />
            <label htmlFor="raised-button-file">
                <Button style={{marginTop: '10px'}} variant="outlined" fullWidth={true} component="span" >
                    Дневник по практике
                </Button>
            </label>


        </AccordionDetails>
    </Accordion>
}
