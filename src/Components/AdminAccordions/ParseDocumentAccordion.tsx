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


export default function ParseDocumentAccordion (){

    const [practiceId, usePracticeId] = useState(0)

    const parseDocumentBySpeciality = (id: number) => {
        axios({
            url: "https://docker-heroku-demo-01.herokuapp.com/parseFile/" + id,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            fileDownload(response.data, 'практика');
        }).catch((response) => {
            alert(response);
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
