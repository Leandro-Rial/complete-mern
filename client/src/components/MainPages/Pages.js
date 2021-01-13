import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom';
import {GlobalState} from '../../GlobalState';
import Home from './Home/Home';
import Products from './Products/Products';
import DetailProduct from './detailProducts/DetailProduct'
import Login from './Auth/Login';
import Register from './Auth/Register';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
import NotFound from './Utils/not-found/NotFound';
import './pages.css';

function Pages() {

    const state = useContext(GlobalState)

    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    
    return (
        <Switch>
            <div className="pages">
                <Route exact path="/" component={Home} />
                
                <Route path="/products" component={Products} />
                <Route path="/detail/:id" component={DetailProduct} />

                <Route path="/category" component={ isAdmin ? Categories : NotFound} />
                
                <Route path="/create_product" component={ isAdmin ? CreateProduct : NotFound} />
                <Route path="/edit_product/:id" component={ isAdmin ? CreateProduct : NotFound} />
                
                <Route path="/login" component={ isLogged ? NotFound : Login} />
                <Route path="/register" component={ isLogged ? NotFound : Register} />

            </div>
                <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default Pages
