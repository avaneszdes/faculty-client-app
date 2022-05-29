import {makeStyles} from "@material-ui/core/styles";

export const ProfileStyles = makeStyles(() => ({
    profileItem: {
        display: 'flex',
        alignItems: 'center',
        margin: '5px',

    },
    profileItemTemplate: {
        width: '160px',
        color: 'black'
    },
    iconButton: {
        marginLeft: '20px'
    }
}));
