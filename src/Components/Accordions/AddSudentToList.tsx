import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as React from "react";
import * as yup from "yup";
import {IStudent} from "../../Redux/Faculty/Faculty-interfaces";


interface Props {
    addStudent: (arg: IStudent) => void
    groupId: number
}

const initValues: IStudent = {
    id: 0,
    name: '',
    surname: '',
    middleName: '',
    username: '',
    password: '',
    practiceId: 0,
    groupId: 0

}

const vScheme = yup.object().shape({
    name: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
})

export default function AddStudentForm({addStudent, groupId}: Props) {

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: vScheme,
        onSubmit(values: IStudent) {
            addStudent({...values,groupId: groupId})
        },
    })

    return <form style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}} onSubmit={formik.handleSubmit}>
        <TextField
            size={'small'}
            placeholder={'Фамилия'}
            label={'Фамилия'}
            name='surname'
            id='surname'
            style={{width: '16%'}}
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
            style={{width: '16%'}}
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
            style={{width: '16%'}}
            onChange={formik.handleChange}
            error={formik.touched.middleName && Boolean(formik.errors.middleName)}
            value={formik.values.middleName}
            helperText={formik.touched.middleName && formik.errors.middleName}
        />
        <TextField
            size={'small'}
            placeholder={'Логин'}
            label={'Логин'}
            name='username'
            id='username'
            style={{width: '16%'}}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            value={formik.values.username}
            helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
            size={'small'}
            placeholder={'Пароль'}
            label={'Пароль'}
            name='password'
            id='password'
            style={{width: '16%'}}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            value={formik.values.password}
            helperText={formik.touched.password && formik.errors.password}
        />

        <Button  variant={'outlined'} type="submit">
            Добавить студента
        </Button>
    </form>
}
