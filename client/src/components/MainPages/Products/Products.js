import React, {useContext} from 'react';
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../Utils/productItem.js/ProductItem';
import Loading from '../Utils/Loading/Loading';
import './product.css';

function Products() {

    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback

    return (
        <>
            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product} token={token} callback={callback} setCallback={setCallback} />
                    })
                }
            </div>
            {products.length === 0 && <Loading />}
        </>
    )
}

export default Products
