import React, {useState, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {GlobalState} from '../../../GlobalState';
import './createProduct.css'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'Params params paradais param param paradais ooooh ooh oooh oooh ooh oohh oohh ooh.',
    content: 'Helouda i can feeling looking for.',
    category: '',
    _id: ''
}

function CreateProduct() {

    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const param = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product)   
                }
            })
        } else {
            setOnEdit(false)
            setProduct(initialState)
        }
    }, [param.id, products])

    const onChangeInput = (e) => {
        const {name, value} = e.target;

        setProduct({...product, [name]:value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {

            if(!isAdmin) return alert("You're not an Admin")
            
            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product}, {
                    headers: {Authorization: token}
                })
            } else {
                await axios.post('/api/products', {...product}, {
                    headers: {Authorization: token}
                })
            }

            setCallback(!callback)

            window.location.href = '/products'

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className="create_product">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" value={product.product_id} onChange={onChangeInput} disabled={onEdit} required />
                </div>
                
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={product.title} onChange={onChangeInput} required />
                </div>
                
                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" value={product.price} onChange={onChangeInput} required />
                </div>
                
                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" value={product.description} onChange={onChangeInput} rows="5" required />
                </div>
                
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" value={product.content} onChange={onChangeInput} rows="7" required />
                </div>
                
                <div className="row">
                    <label htmlFor="categories">Categories</label>
                    <select name="category" value={product.category} onChange={onChangeInput}>
                        <option value="">Please select a Category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{ onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct
