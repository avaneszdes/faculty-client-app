import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Button} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import PracticeMenu from "../AdminBasePage/PracticeMenu";
import {useDispatch} from "react-redux";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED, SET_ALERT_MESSAGE_SUCCEED} from "../../Redux/Alert/Alert-constants";


export default function ParseDocumentAccordion (){

    const [practiceId, usePracticeId] = useState(0)
    const dispatch = useDispatch()

    const parseDocumentBySpeciality = (id: number) => {

        dispatch({type: LOADING_START_SUCCEED, payload: true})

        axios({
            url: "https://docker-heroku-demo-01.herokuapp.com/parseFile/" + id,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            fileDownload(response.data, 'практика.docx');
            dispatch({type: LOADING_END_SUCCEED, payload: false})
        }).catch((response) => {
            dispatch({type: SET_ALERT_MESSAGE_SUCCEED, payload: {message: response.message, type: false}})
            dispatch({type: LOADING_END_SUCCEED, payload: false})
        });
    }

    return <Accordion style={{backgroundColor: '#dff8df'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
        >
            <Typography component={'h2'} variant={'h6'}>Парсинг документа</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div>
                <PracticeMenu isSet={practiceId > 0} setPractice={usePracticeId}/>
                {practiceId > 0 && <div>
                    <Button variant={'contained'} onClick={() => parseDocumentBySpeciality(practiceId)} style={{marginTop: '20px'}}>
                        <Typography component={'span'} variant={'body2'}>Запарсить</Typography>
                    </Button>
                </div>}



            </div>
        </AccordionDetails>
    </Accordion>
}
