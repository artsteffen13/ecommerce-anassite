import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './products.css';
import Spinner from "../loading/Spinner";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('/products/getproducts')
            .then(items => {
                const itemValues = Object.values(items.data);
                setProducts(itemValues);
                setLoading(false);
            })
            .catch(err => alert(err))
    }, [])

    if (loading) {
        return (
            <Spinner />
        )
    }

    return (
        <div
            className='animate__animated animate__fadeIn'
            style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: '20px'
            }}
        >
            {/*{products.map(item => {*/}
            {/*    return (*/}
            {/*        <div key={item.title}>*/}
            {/*            <img className='thumbnail' alt={item.title} src={item.picture} />*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    );
};

export default Products;
