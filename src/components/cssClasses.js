import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export default makeStyles((theme) => ({

    card: {
        boxShadow: theme.shadows[6],
        marginTop: '2rem'
    },
    cardContent: {
        padding: '2rem'
    },
    input: {
        width: '100%',
        marginTop: '2rem'
    }

}));

