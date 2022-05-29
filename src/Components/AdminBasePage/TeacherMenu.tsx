import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import CheckIcon from '@mui/icons-material/Check';

interface Props{
    setTeacher: (id: number) => void
    isSet: boolean
}

export default function TeacherMenu({setTeacher, isSet}: Props) {

    const teachers = useSelector((state:IRootState) => state.user.teachers)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const setPracticeAndClose = (id: number) => {
        setAnchorEl(null)
        setTeacher(id)
    }

    return <div>
        <Button
            endIcon={isSet ? <CheckIcon/> : <div/>}
            style={{height: '40px'}}
            variant={'outlined'}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            Выбор руководителя
        </Button>
        {Boolean(teachers.length) && <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {teachers.map(x => <MenuItem key={x.id} onClick={() => setPracticeAndClose(x.id)}>{x.surname + ' ' + x.name[0] + '.' + x?.middleName[0]  + '.'}</MenuItem>)}
        </Menu>}
    </div>
}
