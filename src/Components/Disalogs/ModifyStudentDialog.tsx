import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {IStudent} from "../../Redux/Faculty/Faculty-interfaces";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface Props {
    props: { student: IStudent, open: boolean }
    modifyStudent: (student: IStudent) => void
    setProps: (open: boolean) => void
}


const vScheme = yup.object().shape({
    name: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
})

export default function ModifyStudentDialog({props, modifyStudent, setProps}: Props) {

    const {student, open} = props
    const initValues: IStudent = {
        id: student.id,
        name: student.name,
        surname: student.surname,
        middleName: student.middleName,
        username: student.username,
        password: student.password,
        practiceId: student.practiceId,
        groupId: student.groupId

    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: vScheme,
        onSubmit(values: IStudent) {
            modifyStudent(values)

        },
    })


    return (
        <div>
            <Dialog
                BackdropProps={{
                    style: {
                        opacity: 0.5,
                        filter: 'alpha(Opacity=70)'
                    }
                }}
                open={open}
                maxWidth={'xl'}
                TransitionComponent={Transition}
                keepMounted
                onClose={setProps}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Редактирование студента'}</DialogTitle>

                <form onSubmit={formik.handleSubmit}>
                    <DialogContent style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <TextField
                                style={{margin: '10px'}}
                                size={'small'}
                                placeholder={'Фамилия'}
                                label={'Фамилия'}
                                name='surname'
                                id='surname'
                                onChange={formik.handleChange}
                                error={formik.touched.surname && Boolean(formik.errors.surname)}
                                value={formik.values.surname}
                                helperText={formik.touched.surname && formik.errors.surname}
                            />
                            <TextField
                                style={{margin: '10px'}}
                                size={'small'}
                                placeholder={'Имя'}
                                label={'Имя'}
                                name='name'
                                id='name'
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                value={formik.values.name}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <TextField
                                style={{margin: '10px'}}
                                size={'small'}
                                placeholder={'Отчество'}
                                label={'Отчество'}
                                name='middleName'
                                id='middleName'
                                onChange={formik.handleChange}
                                error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                                value={formik.values.middleName}
                                helperText={formik.touched.middleName && formik.errors.middleName}
                            />

                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <TextField
                                style={{margin: '10px'}}
                                size={'small'}
                                placeholder={'Логин'}
                                label={'Логин'}
                                name='username'
                                id='username'
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                value={formik.values.username}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setProps(false)}>Отмена</Button>
                        <Button type="submit">Редактировать</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
