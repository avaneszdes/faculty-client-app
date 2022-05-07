import {makeStyles} from "@material-ui/core/styles";

export const ProfileStyles = makeStyles((theme) => ({
    profileItem: {
        display: 'flex',
        alignItems: 'center',
        margin: '5px',
        justifyContent: "space-between"

    },
    profileItemTemplate: {
        width: '250px',
        fontSize: 20
    },
    iconButton: {
        marginLeft: '20px'
    }
}));
