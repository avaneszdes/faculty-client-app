import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';

interface Props{
    setMark: (id: number) => void
    isSet: boolean
}

export default function MarkMenu({setMark, isSet}: Props) {

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
        setMark(id)
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

        >
            Выставить оценку
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
            {[1,2,3,4,5,6,7,8,9,10].map(x => <MenuItem key={x} onClick={() => setPracticeAndClose(x)}>{x}</MenuItem>)}
        </Menu>
    </div>
}
