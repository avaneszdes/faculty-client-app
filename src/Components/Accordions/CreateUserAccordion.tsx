import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {Button, Menu, MenuItem, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {useState} from "react";
import {ICreateUserInterface} from "../../Redux/User/User-interfaces";

const initValues = {
    name: '',
    surname: '',
    middleName: '',
    login: '',
    role: ''
}

const vScheme = yup.object().shape({
    name: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    username: yup.string().required("Required"),
})


interface Props{
    createUser: (user: ICreateUserInterface) => void
}

export default function CreateUserAccordion({createUser}: Props) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [role,setRole] = useState('')

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: vScheme,
        onSubmit(values) {
            const user = {...values, role: role}
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
        setRole(role)
    }


    return <Accordion style={{backgroundColor: '#f8f0df'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel2a-content"
            id="panel2a-header"
        >
            <Typography>Содание пользователя</Typography>
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
                    name='login'
                    id='login'
                    style={{width: '16%'}}
                    onChange={formik.handleChange}
                    error={formik.touched.login && Boolean(formik.errors.login)}
                    value={formik.values.login}
                    helperText={formik.touched.login && formik.errors.login}
                />

                <div>
                    <Button
                        variant={'outlined'}
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
                        <MenuItem onClick={() => setRoleAndClose('СТУДЕНТ')}>СТУДЕНТ</MenuItem>
                        <MenuItem onClick={() => setRoleAndClose('ЗАВ КАФЕДРОЙ')}>ЗАВ КАФЕДРОЙ</MenuItem>
                        <MenuItem onClick={() => setRoleAndClose('КТО-ТО')}>КТО-ТО</MenuItem>
                    </Menu>
                </div>


                <Button variant={'outlined'} type="submit">
                    Создать пользователя
                </Button>
            </form>

        </AccordionDetails>
    </Accordion>
}
