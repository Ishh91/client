import { React, useEffect } from 'react'
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from '../Avatar/Avatar';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from '../../actions/currentUser';
import decode from 'jwt-decode'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var User = useSelector((state) => state.currentUserReducer);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        dispatch(setCurrentUser(null));
    };
    useEffect(() => {
        const token = User?.token;
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    }, [User?.token, dispatch])
    return (
        <nav className="main-nav">
            <div className="navbar">
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt='logo' />
                </Link>
                <Link to="/" className="nav-item nav-btn res-nav">
                    About
                </Link>
                <Link to="/" className="nav-item nav-btn res-nav">
                    Products
                </Link>
                <Link to="/" className="nav-item nav-btn res-nav">
                    For Teams
                </Link>
                <form>
                    <input type="text" placeholder="Search..." />
                    <img src={search} alt="search" width="18" className="search-icon" />
                </form>
                {User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Login
                    </Link> :
                    <>
                        <Avatar
                            backgroundColor="#009dff"
                            px="10px"
                            py="7px"
                            borderRadius="50%"
                            color="white"
                        >
                            <Link
                                to={`/Users/${User?.result?._id}`}
                                style={{ color: "white", textDecoration: "none" }}
                            >
                                {User.result.name.charAt(0).toUpperCase()}
                            </Link>
                        </Avatar>
                        <button className='nav-item nav-links ' onClick={handleLogout}> Logout
                        </button>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar