import React, {useState} from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Spinner from "../loading/Spinner";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#8751DB',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#80DB3B',
            },
            '&:hover fieldset': {
                borderColor: '#8751DB',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#8751DB',
            },
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '90%',
        maxWidth: '350px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const EditProducts = () => {
    const [newItem, setNewItem] = useState({
        title: '',
        description: '',
        price: '',
        picture: ''
    });
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    const createNewItem = e => {
        e.preventDefault();
        setLoading(true);
        axios.post('/editproducts/newproduct', newItem)
            .then(item => {
                if (item.data === 'success') {
                    setOpen(true);
                    setNewItem({
                        title: '',
                        description: '',
                        price: '',
                        picture: ''
                    })
                    setLoading(false);
                }
                if (item.data === 'Unauthorized') {
                    setErrorOpen(true);
                    setLoading(false);
                }
            })
            .catch(err => {
                alert(err);
                setLoading(false);
            })
    }

    const handleNewItemChange = e => {
        const {name, value} = e.target
        setNewItem(prevItems => {
            return (
                {...prevItems, [name]: value}
            )
        })
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setErrorOpen(false);
    };

    return (
        <div>
            <div className='animate__animated animate__fadeIn'>
                <h1>New Product</h1>
                <hr/>
                {loading ? <Spinner/> :
                    <form
                        className={classes.root}
                        noValidate
                        onSubmit={createNewItem}
                    >
                        <CssTextField
                            className={classes.margin}
                            label="Title"
                            variant="outlined"
                            id="title"
                            name="title"
                            value={newItem.title}
                            onChange={handleNewItemChange}
                        />
                        <CssTextField
                            className={classes.margin}
                            label="Description"
                            variant="outlined"
                            id="description"
                            name="description"
                            value={newItem.description}
                            onChange={handleNewItemChange}
                        />
                        <CssTextField
                            className={classes.margin}
                            label="Price"
                            variant="outlined"
                            id="price"
                            name="price"
                            value={newItem.price}
                            onChange={handleNewItemChange}
                        />
                        <CssTextField
                            className={classes.margin}
                            label="Picture URL"
                            variant="outlined"
                            id="picture"
                            name="picture"
                            value={newItem.picture}
                            onChange={handleNewItemChange}
                        />
                        <input type="submit" value="Submit" className="button"/>
                    </form>
                }
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="success">
                    Success! Product Saved
                </Alert>
            </Snackbar>
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Unauthorized! Access Denied
                </Alert>
            </Snackbar>
        </div>
    );
};

export default EditProducts;
