import AccordionSummary from "@mui/material/AccordionSummary";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Button, TextField} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useState} from "react";
import {ISpecialityInterface} from "../../Redux/Specionality/Specionality-interfaces";
import SpecialitiesMenu from "../AdminBasePage/SpecialitiesMenu";


interface Props {
    addGroup: (group: string, specId: number) => void
    specialities: ISpecialityInterface[] | []
}

export default function AddGroupAccordion ({addGroup, specialities}: Props){

    const [group,setGroup] = useState('')
    const [isSet, setIsSet] = useState({isSet: false, id: 0})

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
                <SpecialitiesMenu
                    specialities={specialities}
                    isSet={isSet.isSet}
                    setSpeciality={(v) => setIsSet({...isSet, id: v, isSet: true})}
                />
                {isSet.isSet && isSet.id > 0 && <div>
                    <TextField
                        size={'small'}
                        placeholder={'Номер группы'}
                        label={'Номер группы'}
                        name='dormitoryFloorsQuantity'
                        id='dormitoryFloorsQuantity'
                        style={{width: '200px'}}
                        onChange={(e) => setGroup(e.target.value)}
                    />

                    <Button variant={'outlined'} onClick={() => addGroup(group, isSet.id)} style={{marginLeft: '1%'}}>
                        <Typography component={'span'} variant={'body2'}>Создать</Typography>
                        <AddOutlinedIcon/>
                    </Button>
                </div>}



            </div>
        </AccordionDetails>
    </Accordion>
}
