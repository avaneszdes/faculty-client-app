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


    return <Accordion style={{backgroundColor: '#f8e6df'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
        >
            <Typography component={'h2'} variant={'h5'}>О практике</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div>
                {teacher && <Typography component={'h4'} variant={'h6'}>Руководитель практики: {teacher.surname + ' ' + teacher.name+ ' ' +teacher.middleName}</Typography>}
            </div>

            <Typography style={{marginTop: '30px'}} component={'h2'} variant={'h5'}>
                Комментарии к практике студента
            </Typography>
            {comments && <div>
                {comments.map((x: ICommentInterface, index) => <div key={x.id}>{index +1 + ') ' + x.comment}</div>)}
            </div>}
        </AccordionDetails>
    </Accordion>
}
