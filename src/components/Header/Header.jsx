import { Link } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import logo from '../../assets/logo.png';

export const Header = () => {
  return (
    <header>
      <Link to={"/"}>
          <img src={logo} alt="Logo de la tienda de cómics" className="header-logo" />
      </Link>
      <Nav />
    </header>
  );
};
