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
import {useSelector} from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from 'date-fns/locale/ru';
import {INewPracticeInterface} from "../../Redux/Practice/Practice-interfaces";

interface Props {
    addPractice: (practice: INewPracticeInterface) => void
    deletePractice: (id: number) => void
}

export default function AddPracticeAccordion({addPractice, deletePractice}: Props) {

    const practices = useSelector((state: IRootState) => state.practice.practices)
    const [practice, setPractice] = useState<INewPracticeInterface>({name: '', start: '', end: ''});

    const getParsedDate = (dateAsString: string): string => {
        const month = new Date(dateAsString).getUTCMonth() + 1
        const day = new Date(dateAsString).getUTCDate()
        const year = new Date(dateAsString).getUTCFullYear()


        return `${day}-${month}-${year}`
    }
    return <Accordion style={{backgroundColor: '#8ba067'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
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
                    placeholder={'Название практики'}
                    label={'Название практики'}
                    name='practice'
                    id='practice'
                    variant={'filled'}
                    style={{width: '200px', marginRight: '20px'}}
                    onChange={(e) => setPractice({...practice, name: e.target.value})}
                />

                    <LocalizationProvider locale={ruLocale} dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Дата начала практики"
                            value={practice.start === '' ? null : practice.start }
                            onChange={(newValue) => {
                                if(newValue !== null){
                                    setPractice({...practice, start: newValue});
                                }
                            }}
                            renderInput={(params) => <TextField style={{marginRight: '20px'}} {...params} />}
                        />
                    </LocalizationProvider>


                    <LocalizationProvider locale={ruLocale} dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Дата конца практики"
                            value={practice.end  === '' ? null : practice.end }
                            onChange={(newValue) => {
                                if(newValue !== null){
                                    setPractice({...practice, end: newValue});
                                }
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>


                <Button endIcon={<AddOutlinedIcon/>} variant={'contained'}
                        onClick={() => addPractice({...practice, end: getParsedDate(practice.end), start: getParsedDate(practice.start)})}
                        style={{marginLeft: '20px', height: '50px'}}>
                    <Typography component={'span'} variant={'body2'}>Создать</Typography>
                </Button>
            </div>
        </AccordionDetails>
    </Accordion>
}
