import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useState} from "react";
import {Button, Menu, MenuItem, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {ICreateUserInterface} from "../../Redux/User/User-interfaces";
import {convertRole} from "../../Constants/Global";
import {roles} from "../../Constants/Constants";
import CheckIcon from "@mui/icons-material/Check";

const initValues = {
    name: '',
    surname: '',
    middleName: '',
    password: '12345678',
    login: '',
    role: '',
    teacherId: 0,
    practiceId: 0,
    dolj: null
}

const vScheme = yup.object().shape({
    name: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    login: yup.string().required("Required"),
    dolj: yup.string().required("Required"),
})


interface Props{
    createUser: (user: ICreateUserInterface) => void
}

export default function CreateUserAccordion({createUser}: Props) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [params,setParams] = useState({role: '', practiceId: 0})
    const [isSet,setIsSet] = useState(false)

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: vScheme,
        onSubmit(values) {
            const user = {...values, role: params.role, groupCode: "", practiceId: params.practiceId === 0 ? null : params.practiceId, teacherId: values.teacherId}
            createUser(user)
            setAnchorEl(null)
        }
    })


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const setRoleAndClose = (role: string) => {
        setAnchorEl(null)
        setParams({...params, role: role})
        setIsSet(true)
    }


    return <Accordion style={{backgroundColor: '#f8f0df'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel2a-content"
            id="panel2a-header"
        >
            <Typography component={'h2'} variant={'h6'}>Содание пользователя</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <form style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}
                  onSubmit={formik.handleSubmit}>
                <TextField
                    size={'small'}
                    placeholder={'Фамилия'}
                    label={'Фамилия'}
                    name='surname'
                    id='surname'
                    style={{width: '12%'}}
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
                    style={{width: '12%'}}
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
                    style={{width: '12%'}}
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
                    style={{width: '12%'}}
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
                    style={{width: '12%'}}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    value={formik.values.password}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    size={'small'}
                    placeholder={'Должность'}
                    label={'Должность'}
                    name='dolj'
                    id='dolj'
                    style={{width: '12%'}}
                    onChange={formik.handleChange}
                    error={formik.touched.dolj && Boolean(formik.errors.dolj)}
                    value={formik.values.dolj}
                    helperText={formik.touched.dolj && formik.errors.dolj}
                />

                <div>
                    <Button
                        endIcon={isSet ? <CheckIcon/> : <div/>}
                        variant={'outlined'}
                        style={{height: '40px'}}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Роль
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {roles.map(x => <MenuItem key={x} onClick={() => setRoleAndClose(convertRole(x))}>{x}</MenuItem>)}
                    </Menu>
                </div>


                <Button variant={'contained'} type="submit">
                    Создать пользователя
                </Button>
            </form>

        </AccordionDetails>
    </Accordion>
}
