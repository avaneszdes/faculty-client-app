import AccordionSummary from "@mui/material/AccordionSummary";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Button, TextField} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useState} from "react";


interface Props {
    addGroup: (group: string) => void
}

export default function AddGroupAccordion ({addGroup}: Props){

    const [group,setGroup] = useState('')

    return <Accordion style={{backgroundColor: '#dff8df'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
        >
            <Typography component={'h2'} variant={'h6'}>Добавить группу</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div>
                <TextField
                    size={'small'}
                    placeholder={'Номер группы'}
                    label={'Номер группы'}
                    name='dormitoryFloorsQuantity'
                    id='dormitoryFloorsQuantity'
                    style={{width: '200px'}}
                    onChange={(e) => setGroup(e.target.value)}
                />

                <Button variant={'outlined'} onClick={() => addGroup(group)} style={{marginLeft: '1%'}}>
                    <Typography component={'span'} variant={'body2'}>Создать</Typography>
                    <AddOutlinedIcon/>
                </Button>
            </div>
        </AccordionDetails>
    </Accordion>
}
