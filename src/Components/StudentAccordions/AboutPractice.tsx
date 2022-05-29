import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {IRootState} from "../../Redux/configureStore";
import {useSelector } from "react-redux";
import {ICommentInterface} from "../../Redux/Faculty/Faculty-interfaces";

export default function AboutPractice (){

    const teacher = useSelector((state: IRootState) => state.user.teacher)
    const comments = useSelector((x:IRootState) => x.faculty.comments)
    const user = useSelector((x:IRootState) => x.user.user)


    return <Accordion style={{backgroundColor: '#f8e6df'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
        >
            <Typography component={'h2'} variant={'h5'}>О практике</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {teacher &&  <div style={{display: 'flex', alignItems: 'center'}}>
                <Typography component={'h2'} variant={'h5'}>Руководитель практики:</Typography>
                    <Typography component={'h4'} style={{color: 'green', marginLeft: '20px'}} variant={'h6'}>{teacher.surname + ' ' + teacher.name+ ' ' +teacher.middleName}</Typography>
            </div>}

            <Typography style={{marginTop: '30px'}} component={'h2'} variant={'h5'}>
                Оценка за практику
            </Typography>
            {!user?.mark && <div>
                Оценка еще не выставлена
            </div>}
            {user?.mark && <div style={{display: 'flex', alignItems: 'center'}}>
                Оценка за практику  <Typography style={{color: 'green', marginLeft: '20px'}} component={'h2'} variant={'h5'}>
                {user?.mark}
            </Typography>
            </div>}
            
            <Typography style={{marginTop: '30px'}} component={'h2'} variant={'h5'}>
                Комментарии к практике студента
            </Typography>
            {!comments && <div>
                Пока что нет коментариев
            </div>}
            {comments && <div>
                {comments.map((x: ICommentInterface, index) => <div key={x.id}>{index + 1 + ') ' + x.comment}</div>)}
            </div>}


        </AccordionDetails>
    </Accordion>
}
