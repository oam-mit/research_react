import React from 'react';
import logo from '../../assets/iste_logo.png';
import { Link } from 'react-router-dom';

const Navbar =()=>{
    return(
        
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark" id="nav-color">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand" href="/"><img src={logo} className="img-responsive logo" alt="Iste logo"/></a>

    <a className="navbar-brand" href="/">ISTE Manipal</a>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">About Us</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">Blogs</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">Members</a>
            </li>
        </ul>
        
        <div className="search-box">
            <input className="search-txt mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <span className="search-btn"> <i className="fa fa-search" style={{color:'black'}}></i>
            </span>
        </div>

        <div className="dropdown order-1">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Profile
            </button>
            <div className="dropdown-menu" id="profile" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to="/profile">Your Profile</Link>
              <a className="dropdown-item" href="/">You saved contacts</a>
              <a className="dropdown-item" href="/">Log Out</a>
            </div>
          </div>
    </div>
</nav>
    );
}

export default Navbar;