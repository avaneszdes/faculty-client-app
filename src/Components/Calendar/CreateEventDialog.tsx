import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import {EventToCreate} from "../../Redux/Calendar/Calendar-interfaces";
import {TextField} from "@mui/material";
import {HexColorPicker} from "react-colorful";

interface Props {
    open: boolean
    close: (close: boolean) => void
    createEvent: (event: EventToCreate) => void
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function CreateEventDialog({open, close, createEvent}: Props) {

    const [color, setColor] = useState('')
    const [text, setText] = useState('')


    const createNewEvent = () => {

        if (text !== '') {
            createEvent({
                startAt: '2021-11-21T18:00:00.000Z',
                endAt: '2021-11-21T19:00:00.000Z',
                timezoneStartAt: 'Europe/Minsk',
                summary: text,
                color: color,
                calendarId: 'work',
                userId: '',
                practiceId: ''
            })

            close(false)
        }

    }


    return <div>
        <Dialog
            BackdropProps={{
                style: {
                    opacity: 0.5,
                    filter: 'alpha(Opacity=70)'
                }
            }}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => close(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Создание события</DialogTitle>

            <DialogContent style={{width: '500px'}}>

                <DialogContent style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TextField
                        multiline={true}
                        minRows={5}
                        error={text === ''}
                        value={text}
                        style={{margin: '10px', width: '400px'}}
                        size={'small'}
                        placeholder={'Текст для события'}
                        label={'Текст для события'}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <HexColorPicker color={color} onChange={setColor}/>

                </DialogContent>
            </DialogContent>

            <DialogActions>
                <Button color={'success'} variant={'outlined'} onClick={createNewEvent}>Создать</Button>
                <Button variant={'outlined'} onClick={() => close(false)}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    </div>
}
