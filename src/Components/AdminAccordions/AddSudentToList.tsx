import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as React from "react";
import { useState } from "react";
import * as yup from "yup";
import {ICreateUserInterface} from "../../Redux/User/User-interfaces";
import PracticeMenu from "../AdminBasePage/PracticeMenu";
import TeacherMenu from "../AdminBasePage/TeacherMenu";

interface Props {
    addStudent: (arg: ICreateUserInterface) => void
}

const initValues: ICreateUserInterface = {
    name: '',
    surname: '',
    middleName: '',
    login: '',
    password: '',
    role: 'STUDENT',
    groupCode: '',
    teacherId: 0,
    practiceId: 0
}

const vScheme = yup.object().shape({
    name: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    login: yup.string().required("Required"),
    password: yup.string().required("Required"),
})

export default function AddStudentForm({addStudent}: Props) {

    const [practiceId, usePracticeId] = useState(0)
    const [teacherId, useTeacherId] = useState(0)

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: vScheme,
        onSubmit(values: ICreateUserInterface) {
            addStudent({...values, practiceId: practiceId, teacherId: teacherId})
        },
    })

    return <form style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}
                 onSubmit={formik.handleSubmit}>
        <TextField
            size={'small'}
            placeholder={'Фамилия'}
            label={'Фамилия'}
            name='surname'
            id='surname'
            style={{width: '13%'}}
            onChange={formik.handleChange}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            value={formik.values.surname}
            helperText={formik.touched.surname && formik.errors.surname}
        />
        <TextField
            size={'small'}
            placeholder={'Имя'}
            label={'Имя'}
            name='name'
            id='name'
            style={{width: '13%'}}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            value={formik.values.name}
            helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
            size={'small'}
            placeholder={'Отчество'}
            label={'Отчество'}
            name='middleName'
            id='middleName'
            style={{width: '13%'}}
            onChange={formik.handleChange}
            error={formik.touched.middleName && Boolean(formik.errors.middleName)}
            value={formik.values.middleName}
            helperText={formik.touched.middleName && formik.errors.middleName}
        />
        <TextField
            size={'small'}
            placeholder={'Логин'}
            label={'Логин'}
            name='login'
            id='login'
            style={{width: '13%'}}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            value={formik.values.login}
            helperText={formik.touched.login && formik.errors.login}
        />
        <TextField
            size={'small'}
            placeholder={'Пароль'}
            label={'Пароль'}
            name='password'
            id='password'
            style={{width: '13%'}}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            value={formik.values.password}
            helperText={formik.touched.password && formik.errors.password}
        />

        <PracticeMenu isSet={practiceId > 0} setPractice={usePracticeId}/>
        <TeacherMenu isSet={teacherId > 0} setTeacher={useTeacherId}/>
        <Button variant={'contained'} type="submit">
            Добавить студента
        </Button>
    </form>
}
