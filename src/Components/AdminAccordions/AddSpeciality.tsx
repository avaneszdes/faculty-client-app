import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useState} from "react";
import {Button, TextField} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {ISpecialityInterface} from "../../Redux/Specionality/Specionality-interfaces";

interface Props {
    deleteSpeciality: (id: number) => void
    addSpeciality: (specialityName: string) => void
    specialities: ISpecialityInterface[] | []
}

export default function SpecialitiesAccordion({deleteSpeciality, addSpeciality, specialities}: Props) {

    const [isVisibleTypeForm, setIsVisibleTypeForm] = useState(false)
    const [specialityName, setSpecialityName] = useState('')


    return <Accordion style={{backgroundColor: '#f8dfe8'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel2a-content"
            id="panel2a-header"
        >
            <Typography component={'h2'} variant={'h6'}>Специальность</Typography>
        </AccordionSummary>
        <AccordionDetails>

            {specialities && <div>
                {specialities.map((x, index) =>
                    <Button onClick={() => deleteSpeciality(x.id)}
                            style={{marginLeft: '5px'}}
                            variant={'contained'}
                            key={index}
                            endIcon={<DeleteForeverIcon/>}>
                        <Typography component={'span'} variant={'body2'}>{x.name}</Typography>
                    </Button>
                )}
            </div>}

            <div>

                {!isVisibleTypeForm &&
                <Button style={{margin: '15px 0px 0px 5px'}}
                        variant={'outlined'}
                        onClick={() => setIsVisibleTypeForm(true)}
                >
                    Добавить специальность
                </Button>}

                {isVisibleTypeForm &&
                <div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="type"
                        label='Название срециальности'
                        autoComplete="type"
                        autoFocus
                        onChange={(e) => setSpecialityName(e.target.value)}
                    />
                    <Button variant={'outlined'} onClick={() => {
                        addSpeciality(specialityName);
                        setIsVisibleTypeForm(false)
                    }}
                    >
                        Добавить
                    </Button>
                </div>}


            </div>

        </AccordionDetails>
    </Accordion>
}
