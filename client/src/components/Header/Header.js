import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import {GlobalState} from '../../GlobalState';
import axios from 'axios';
import './header.css'

function Header() {

    const state = useContext(GlobalState);

    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    const logoutUser = async (e) => {
        try {
            
            await axios.get('/user/logout')

            localStorage.removeItem('firstLogin')

            window.location.href = '/'

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const adminRouter = () => {
        return(
            <>
                <li><Link to="/create_product"><i className="fas fa-plus-circle"></i>&nbsp;Create Products</Link></li>
                
                <li><Link to="/category"><i className="fas fa-scroll"></i>&nbsp;Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return(
            <>
                <li><Link to="/" onClick={logoutUser}><i className="fas fa-sign-out-alt"></i>&nbsp;Logout</Link></li>
            </>
        )
    }

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link className="Logo" to="/">{ isLogged ? 'Admin' : 'WallStreet'}</Link>
                    </li>
                </ul>

                <ul>
                    <li><Link to="/"><i className="fas fa-home"></i>&nbsp;Home</Link></li>
                    <li><Link to="/products"><i className="fas fa-box-open"></i>&nbsp;{ isLogged ? 'Shop' : 'Products'}</Link></li>

                    {isAdmin && adminRouter()}

                    {
                        isLogged ? loggedRouter() : <li><Link to="/login"><i className="fas fa-sign-in-alt"></i>&nbsp;Sign In</Link></li>
                    }

                </ul>

                <ul>
                    <li>
                        <div>
                            <Link to="#">
                                <i className="fas fa-shopping-cart"></i>
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
