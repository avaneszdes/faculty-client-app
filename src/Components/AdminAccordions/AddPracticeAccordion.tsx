import AccordionSummary from "@mui/material/AccordionSummary";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Button, TextField} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useState} from "react";
import {IRootState} from "../../Redux/configureStore";
import { useSelector } from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
    addPractice: (group: string) => void
    deletePractice: (id: number) => void
}

export default function AddPracticeAccordion ({addPractice,deletePractice}: Props){

    const [practice,setPractice] = useState('')
    const practices = useSelector((state: IRootState) => state.practice.practices)

    return <Accordion style={{backgroundColor: '#8ba067'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
        >
            <Typography component={'h2'} variant={'h6'}>Практика</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {practices && <div style={{margin: '0px 0px 20px -5px'}}>
                {practices.map((x, index) =>
                    <Button onClick={() => deletePractice(x.id)}
                            style={{marginLeft: '5px'}}
                            variant={'contained'}
                            key={index}
                            endIcon={<DeleteForeverIcon/>}>
                        <Typography component={'span'} variant={'body2'}>{x.name}</Typography>
                    </Button>
                )}
            </div>}
            <div>
                <TextField
                    size={'small'}
                    placeholder={'Название практики'}
                    label={'Название практики'}
                    name='practice'
                    id='practice'
                    style={{width: '200px'}}
                    onChange={(e) => setPractice(e.target.value)}
                />

                <Button variant={'outlined'} onClick={() => addPractice(practice)} style={{marginLeft: '1%'}}>
                    <Typography component={'span'} variant={'body2'}>Создать</Typography>
                    <AddOutlinedIcon/>
                </Button>
            </div>
        </AccordionDetails>
    </Accordion>
}
