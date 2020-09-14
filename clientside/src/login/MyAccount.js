import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import {NavLink} from "react-router-dom";

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
            backgroundColor: '#DBD530',
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
        <div className='animate__animated animate__fadeIn'>
            <h1>Your Account Info</h1>
            <hr/>
            <div style={{maxWidth: '700px', margin: '40px auto 0 auto'}}>
                <NavLink to='/editaccount'>
                    <Tooltip title="Edit" placement="top-end" arrow>
                        <EditOutlinedIcon
                            style={{
                                float: 'right',
                                fontSize: '40px',
                                margin: '20px',
                                color: '#8751DB',
                                cursor: 'pointer'
                            }}
                        />
                    </Tooltip>
                </NavLink>
                <TableContainer component={Paper} style={{border: '1px solid #DBD530'}}>
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
        </div>
    );
};

export default MyAccount;
