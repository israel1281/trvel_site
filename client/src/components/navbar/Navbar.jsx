import './navbar.css';
import { SiYourtraveldottv } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" className="logo">
                    <SiYourtraveldottv />
                    Trvel
                </Link>
                {user ? (
                    user.username
                ) : (
                    <div className="navItems">
                        <button className="navButton">Register</button>
                        <button className="navOutline">Login</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
