import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import {BaseCalendarEvent} from "../../Redux/Calendar/Calendar-interfaces";
import {TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {HexColorPicker} from "react-colorful";
import {getFullDate} from "../../Global";
import {DateTimePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

interface Props {
    open: boolean
    close: (close: boolean) => void
    editEvent: (event: BaseCalendarEvent) => void
    deleteEvent: (eventId: number) => void
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});


export default function DetailedInformationWithUpdateDialog({open, close, editEvent, deleteEvent}: Props) {

    const currentEvent = useSelector((rootState: IRootState) => rootState.calendar.currentEvent) as BaseCalendarEvent
    const [eventData, setEventData] = useState(currentEvent)

    useEffect(() => {
        setEventData(currentEvent)
    }, [currentEvent]);

    const update = () => {
        editEvent({
            ...eventData,
            startAt: new Date(eventData?.startAt ?? 0).toISOString(),
            endAt: new Date(eventData?.endAt ?? 0).toISOString()
        })
    }

    return <div>{eventData &&
    <Dialog
        BackdropProps={{
            style: {
                opacity: 0.5,
                filter: 'alpha(Opacity=70)'
            }
        }}
        maxWidth='xl'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => close(false)}
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle>Информация о событии</DialogTitle>
        <DialogContent>
            <DialogContent style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'

            }}>

                <div>
                    <div style={{
                        width: '550px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker

                                label="Дата начала:"
                                value={getFullDate(new Date(eventData?.startAt ?? 0), 'en-us')}
                                onChange={(e) => setEventData({...eventData, startAt: e?.toString()})}
                                renderInput={(params: any) => <TextField style={{width: '240px'}} {...params} />}
                            />
                        </LocalizationProvider>
                        <Typography>{getFullDate(new Date(eventData?.startAt ?? 0), 'ru-RU')}</Typography>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '20px',
                        justifyContent: 'space-between'
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Дата завершения:"
                                value={getFullDate(new Date(eventData?.endAt ?? 0), 'en-us')}
                                onChange={(e) => setEventData({...eventData, endAt: e?.toString()})}
                                renderInput={(params: any) => <TextField style={{width: '240px'}} {...params} />}
                            />
                        </LocalizationProvider>

                        <Typography>{getFullDate(new Date(eventData?.endAt ?? 0), 'ru-RU')}</Typography>
                    </div>
                </div>

                <div style={{
                    border: 'solid 0.5px green',
                    borderRadius: '5px',
                    height: '400px',
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Typography fontSize={14}>Текст события</Typography>
                    <TextField
                        label={'Текст для события'}
                        multiline={true}
                        minRows={5}
                        defaultValue={eventData.summary === undefined ? currentEvent?.summary : eventData.summary}
                        style={{margin: '10px', width: '400px'}}
                        size={'small'}
                        placeholder={'Текст для события'}
                        onChange={(e) => setEventData({...eventData, summary: e.target.value})}
                    />
                    <HexColorPicker
                        color={eventData.color === undefined ? currentEvent?.color : eventData.color}
                        onChange={(e) => setEventData({...eventData, color: e})}
                    />
                </div>
            </DialogContent>
        </DialogContent>

        <DialogActions>
            <Button color={'success'} variant={'outlined'} onClick={update}>Применить</Button>
            <Button color={'error'} variant={'outlined'}
                    onClick={() => deleteEvent(currentEvent?.id)}>Удалить</Button>
            <Button style={{marginLeft: '50%'}} variant={'outlined'} onClick={() => close(false)}>Закрыть</Button>
        </DialogActions>
    </Dialog>}
    </div>
}
