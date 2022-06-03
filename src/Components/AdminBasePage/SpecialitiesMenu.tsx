import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import {ISpecialityInterface} from "../../Redux/Specionality/Specionality-interfaces";

interface Props{
    setSpeciality: (id: number) => void
    specialities: ISpecialityInterface[] | []
    isSet: boolean
}

export default function SpecialitiesMenu({setSpeciality, isSet, specialities}: Props) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const setSpecialityAndClose = (id: number) => {
        setAnchorEl(null)
        setSpeciality(id)
    }

    return <div>
        <Button
            endIcon={isSet ? <CheckIcon/> : <div/>}
            variant={'contained'}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{marginBottom: '20px'}}
        >
            Выбор срециальности
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
            {specialities.map(x => <MenuItem key={x.id} onClick={() => setSpecialityAndClose(x.id)}>{x.name}</MenuItem>)}
        </Menu>
    </div>
}
