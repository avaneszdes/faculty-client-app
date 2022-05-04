import { makeStyles} from "@material-ui/core/styles";


export const useProfileStyles = makeStyles((theme) => ({
    listItem: {
        height: '20px',
        margin: '5px',
        border: 'solid 0.5px',
        padding: '5px',
        borderRadius: '5px',
        width: '24%',
        textAlign: "center",
    },
    listItemError: {
        height: '20px',
        margin: '5px',
        border: 'solid 0.5px',
        padding: '5px',
        borderRadius: '5px',
        width: '24%',
        textAlign: "center",
    },
    listItemSuccess: {
        height: '20px',
        margin: '5px',
        border: 'solid 0.5px',
        padding: '5px',
        borderRadius: '5px',
        width: '24%',
        textAlign: "center",
    },
    listItemHeader: {
        height: '20px',
        margin: '5px',
        borderLeft: 'solid 0.5px',
        borderRight: 'solid 0.5px',
        padding: '5px',
        width: '24%',
        textAlign: "center",
    },
    listItemPaper: {
        display: 'flex',
        marginTop: '4px',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '99%',
        margin: '5px'
    },
    list: {
        overflowY: "auto",
        maxHeight: '500px',
        marginTop: '10px',
        border: 'solid 0.5px',
        borderRadius: '5px',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(134,203,96)',
            outline: '1px solid',
            borderRadius: '50px'
        }
    }
}));
