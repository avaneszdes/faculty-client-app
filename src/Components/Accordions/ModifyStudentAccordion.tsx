import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Button, IconButton, Paper, TextField} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import * as React from "react";
import {useState} from "react";
import ActionDialog from "../Disalogs/ActionDialog";
import ModifyStudentDialog from "../Disalogs/ModifyStudentDialog";
import {useProfileStyles} from "../BasePage/BaseLogicPageStyles";
import {IStudent} from "../../Redux/Faculty/Faculty-interfaces";
import AddStudentForm from "./AddSudentToList";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import DetailedActionDialog from "../Disalogs/DetailedInformation";


interface Props {
    getStudentsByGroup: (group: string) => void
    addStudentToList: (student: IStudent) => void
    deleteStudentFromList: (id: number) => void
    modifyStudent: (student: IStudent) => void
    students: IStudent[]
}

const deleteDialogText: any = {
    text: 'Вы действительно ходите удалить',
    title: 'Удаление'

}

export default function ModifyStudentsAccordion({getStudentsByGroup, addStudentToList,
                                                    deleteStudentFromList, students, modifyStudent}: Props) {

    const classes = useProfileStyles();
    const [group, setGroup] = useState('')
    const [deleteAction, setDeleteAction] = useState({isOpen: false, id: 0})
    const [detailedAction, setDetailedAction] = useState({isOpen: false, student: students[0]})
    const [modifyStudentProps, setModifyStudentProps] = useState({open: false, student: students[0]})

    const prepareToModifyStudent = (student: IStudent) =>{
        modifyStudent(student)
        setModifyStudentProps({...modifyStudentProps, open: false})
    }

    const deleteStudentAction = (isOk: boolean) => {
        if (isOk){
            deleteStudentFromList(deleteAction.id)
            setDeleteAction({isOpen: false, id: 0})
        }else{
            setDeleteAction({isOpen: false, id: 0})
        }

    }

    return <Accordion  style={{backgroundColor: '#dff8f8'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel3a-content"
            id="panel3a-header"
        >
            <Typography>Просмотр групп</Typography>
        </AccordionSummary>
        <AccordionDetails >

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

                <IconButton onClick={() => getStudentsByGroup(group)} style={{marginLeft: '1%'}}>
                    <SearchOutlinedIcon/>
                </IconButton>
            </div>


            {Boolean(students.length) && students[0].groupId &&
                <AddStudentForm addStudent={addStudentToList} groupId={students[0].groupId}/>
            }


            {Boolean(students.length) && students[0].groupId &&
            <div className={classes.list}>
                <div style={{display: 'flex', width: '1350px', justifyContent: 'space-between', marginLeft: '5px'}}>
                    <Typography sx={{ fontWeight: 600 }} className={classes.listItemHeader}>Имя</Typography>
                    <Typography sx={{ fontWeight: 600 }} className={classes.listItemHeader}>Фамилия</Typography>
                    <Typography sx={{ fontWeight: 600 }} className={classes.listItemHeader}>Отчество</Typography>
                    <Typography sx={{ fontWeight: 600 }} className={classes.listItemHeader}>Статус договора</Typography>
                </div>
                {Boolean(students.length) && students.map((x, index) =>
                    <Paper className={classes.listItemPaper}  key={index} elevation={3}>
                        <div style={{display: 'flex', width: '1350px', justifyContent: 'space-between'}}>
                            <Typography className={classes.listItem}>{x.name}</Typography>
                            <Typography className={classes.listItem}>{x.surname}</Typography>
                            <Typography className={classes.listItem}>{x.middleName}</Typography>
                            <Typography className={classes.listItem}>??????</Typography>
                        </div>

                        <Button onClick={() => setDetailedAction({...detailedAction, isOpen: true, student: x })}  variant={'outlined'}>
                            <Typography>Информация</Typography>
                            <FeedOutlinedIcon/>
                        </Button>

                        <Button onClick={() => setModifyStudentProps({...modifyStudentProps, student: x, open: true})} variant={'outlined'}>
                            <Typography>Изменить</Typography>
                            <EditOutlinedIcon/>
                        </Button>

                        <Button variant={'outlined'}
                                onClick={() => setDeleteAction({...deleteAction, isOpen: true, id: x.id})}
                                style={{marginLeft: '1%'}}>
                            <Typography>Удалить</Typography>
                            <DeleteForeverOutlinedIcon/>
                        </Button>

                        { modifyStudentProps.open &&
                            <ModifyStudentDialog modifyStudent={prepareToModifyStudent}
                                                 props={modifyStudentProps}
                                                 setProps={() => setModifyStudentProps({...modifyStudentProps, open: false })}/>
                        }

                        { detailedAction &&
                            <DetailedActionDialog
                                isOpen={detailedAction.isOpen}
                                close={(value) => setDetailedAction({...detailedAction, isOpen: value})}
                                userData={detailedAction.student}
                            />
                        }
                    </Paper>
                )}
            </div>}

            <ActionDialog open={deleteAction.isOpen} title={deleteDialogText.title} text={deleteDialogText.text} answer={deleteStudentAction}/>

        </AccordionDetails>
    </Accordion>

}
