import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import CheckIcon from '@mui/icons-material/Check';

interface Props{
    setPractice: (id: number) => void
    isSet: boolean
}

export default function PracticeMenu({setPractice, isSet}: Props) {

    const practices = useSelector((state:IRootState) => state.practice.practices)
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
        setPractice(id)
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
            Выбор практики
        </Button>
        {Boolean(practices.length) && <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {practices.map(x => <MenuItem key={x.id} onClick={() => setPracticeAndClose(x.id)}>{x.name}</MenuItem>)}
        </Menu>}
    </div>
}
