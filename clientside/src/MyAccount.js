import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const MyAccount = (props) => {

    const classes = useStyles();

    function createData(name, info) {
        return {name, info};
    }

    const rows = [
        createData('First Name', props.userInfo.firstName),
        createData('Last Name', props.userInfo.lastName),
        createData('Phone Number', props.userInfo.phoneNumber),
        createData('Street Address', props.userInfo.address.street),
        createData('City', props.userInfo.address.city),
        createData('State', props.userInfo.address.state),
        createData('Zipcode', props.userInfo.address.zipcode),
    ];
    return (
        <div style={{maxWidth: '700px', margin: '40px auto 0 auto'}}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                        <TableRow>
                            <StyledTableCell>Email:</StyledTableCell>
                            <StyledTableCell align="left">{props.userInfo.email}</StyledTableCell>
                        </TableRow>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.info}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyAccount;
