import { Link } from 'react-router-dom';

function Navbar(){
    return (
        <nav style={{display:"flex", gap:"10px"}}>

                    <Link to="/">Logo</Link>

                    <Link to="/products">Historia zamówień</Link>

                    <Link to="/koszyk">Koszyk</Link>

                    <Link to="/logowanie">Profil</Link>

        </nav>
    );
}

export default Navbar;