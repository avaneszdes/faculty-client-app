import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Button, Divider, IconButton, Paper, TextField} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import * as React from "react";
import {useState} from "react";
import ActionDialog from "../Disalogs/ActionDialog";
import ModifyStudentDialog from "../Disalogs/ModifyStudentDialog";
import AddStudentForm from "./AddSudentToList";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import DetailedActionDialog from "../Disalogs/DetailedInformation";
import {useProfileStyles} from "../AdminBasePage/AdminBasePageStyles";
import {ICreateUserInterface, IUserInterface} from "../../Redux/User/User-interfaces";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {IMPORT_STUDENTS} from "../../Redux/User/User-constants";
import PracticeMenu from "../AdminBasePage/PracticeMenu";


interface Props {
    getStudentsByGroup: (group: string) => void
    addStudentToList: (user: ICreateUserInterface) => void
    deleteStudentFromList: (login: string) => void
    modifyStudent: (student: IUserInterface) => void
}

const deleteDialogText: any = {
    text: 'Вы действительно ходите удалить',
    title: 'Удаление'
}

export default function ModifyStudentsAccordion({
                                                    getStudentsByGroup,
                                                    addStudentToList,
                                                    deleteStudentFromList,
                                                    modifyStudent
                                                }: Props) {

    const classes = useProfileStyles()
    const [group, setGroup] = useState('')
    const users = useSelector((rootState: IRootState) => rootState.user.users)
    const [deleteAction, setDeleteAction] = useState({isOpen: false, login: ''})
    const [detailedAction, setDetailedAction] = useState({isOpen: false, student: users[0]})
    const [modifyStudentProps, setModifyStudentProps] = useState({open: false, student: users[0]})
    const dispatch = useDispatch()
    const [practiceId, usePracticeId] = useState(0)

    const prepareToModifyStudent = (student: IUserInterface) => {
        modifyStudent(student)
        setModifyStudentProps({...modifyStudentProps, open: false})
    }

    const csvFileUpload = (e: any) => {

        console.log(e.target.files)
        if (e.target.files[0] !== null) {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            dispatch({
                type: IMPORT_STUDENTS,
                payload: {file: formData, groupCode: group, practiceId: practiceId}
            })


        }
    }

    const deleteStudentAction = (isOk: boolean) => {
        if (isOk) {
            deleteStudentFromList(deleteAction.login)
            setDeleteAction({isOpen: false, login: ''})
        } else {
            setDeleteAction({isOpen: false, login: ''})
        }
    }

    return <Accordion style={{backgroundColor: '#dff8f8'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel3a-content"
            id="panel3a-header"
        >
            <Typography component={'h2'} variant={'h6'}>Просмотр групп</Typography>
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

                <IconButton onClick={() => getStudentsByGroup(group)} style={{marginLeft: '1%'}}>
                    <SearchOutlinedIcon/>
                </IconButton>
            </div>

            <Divider />

            {group && <div style={{display: 'flex', margin: '20px 0px 20px 0px'}}>

                <div style={{margin: '0px 20px 0px 0px'}}>
                    <PracticeMenu isSet={practiceId > 0} setPractice={usePracticeId}/>
                </div>

                <input
                    accept="text/csv"
                    style={{display: 'none'}}
                    id="raised-button-file"
                    multiple
                    onChange={csvFileUpload}
                    type="file"
                />
                <label htmlFor="raised-button-file">
                    <Button variant="outlined" style={{height: '40px'}} component="span" fullWidth={true}>
                        Импортировать студентов с файла формата .csv
                    </Button>
                </label>



            </div>}

            <Divider />

            <div style={{margin: '20px 0px 20px 0px'}}>
                <AddStudentForm addStudent={(student) => addStudentToList({...student, groupCode: group})}/>
            </div>


            {Boolean(users.length) &&
            <div className={classes.list}>
                <div style={{display: 'flex', width: '1350px', justifyContent: 'space-between', marginLeft: '5px'}}>
                    <Typography component={'span'} variant={'body2'} sx={{fontWeight: 600}}
                                className={classes.listItemHeader}>Имя</Typography>
                    <Typography component={'span'} variant={'body2'} sx={{fontWeight: 600}}
                                className={classes.listItemHeader}>Фамилия</Typography>
                    <Typography component={'span'} variant={'body2'} sx={{fontWeight: 600}}
                                className={classes.listItemHeader}>Отчество</Typography>
                </div>
                {Boolean(users.length) && users.map((x, index) =>
                    <Paper className={classes.listItemPaper} key={index} elevation={12}>
                        <div style={{display: 'flex', width: '1350px', justifyContent: 'space-between'}}>
                            <Typography component={'span'} variant={'body2'}
                                        className={classes.listItem}>{x.name}</Typography>
                            <Typography component={'span'} variant={'body2'}
                                        className={classes.listItem}>{x.surname}</Typography>
                            <Typography component={'span'} variant={'body2'}
                                        className={classes.listItem}>{x.middleName}</Typography>
                        </div>

                        <Button onClick={() => setDetailedAction({...detailedAction, isOpen: true, student: x})}
                                variant={'outlined'}>
                            <Typography component={'span'} variant={'body2'}>Информация</Typography>
                            <FeedOutlinedIcon/>
                        </Button>

                        <Button onClick={() => setModifyStudentProps({...modifyStudentProps, student: x, open: true})}
                                variant={'outlined'}>
                            <Typography component={'span'} variant={'body2'}>Изменить</Typography>
                            <EditOutlinedIcon/>
                        </Button>

                        <Button variant={'outlined'}
                                onClick={() => setDeleteAction({...deleteAction, isOpen: true, login: x.login})}
                                style={{marginLeft: '1%'}}>
                            <Typography component={'span'} variant={'body2'}>Удалить</Typography>
                            <DeleteForeverOutlinedIcon/>
                        </Button>

                        {modifyStudentProps.open &&
                        <ModifyStudentDialog modifyStudent={prepareToModifyStudent}
                                             props={modifyStudentProps}
                                             setProps={() => setModifyStudentProps({
                                                 ...modifyStudentProps,
                                                 open: false
                                             })}/>
                        }

                        {detailedAction &&
                        <DetailedActionDialog
                            isOpen={detailedAction.isOpen}
                            close={(value) => setDetailedAction({...detailedAction, isOpen: value})}
                            userData={detailedAction.student}
                        />
                        }
                    </Paper>
                )}
            </div>}

            <ActionDialog open={deleteAction.isOpen} title={deleteDialogText.title} text={deleteDialogText.text}
                          answer={deleteStudentAction}/>

        </AccordionDetails>
    </Accordion>

}
