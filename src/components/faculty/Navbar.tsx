import React from "react";
import logo from "../../assets/iste_logo.png";
import { Link, NavLink } from "react-router-dom";
import UserProvider from "../../providers/UserProvider";
import "../../assets/navbar.css";
import {
	showContactUsAlert,
	showReactAlert,
} from "../../services/AlertService";
import { FacultyType } from "../../backend/common/UserTypes";

const Navbar = () => {
	return (
		<nav
			className="navbar navbar-expand-lg fixed-top navbar-dark"
			id="nav-color"
		>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarTogglerDemo03"
				aria-controls="navbarTogglerDemo03"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<a
				className="navbar-brand"
				href="/"
				onClick={event => event.preventDefault()}
			>
				<img src={logo} className="img-responsive logo" alt="Iste logo" />
			</a>

			<a
				className="navbar-brand "
				href="/"
				onClick={event => event.preventDefault()}
			>
				ISTE Manipal
			</a>

			<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
				<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
					<li className="nav-item">
						<NavLink
							activeClassName={"active"}
							className="nav-link"
							to="/faculty/home"
						>
							Home
						</NavLink>
					</li>
					{/* <li className="nav-item">
						<a className="nav-link" href="/">
							About Us
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/">
							Blogs
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/">
							Members
						</a>
					</li> */}
					<li className="nav-item">
						<a
							href="/"
							className="nav-link"
							onClick={event => {
								event.preventDefault();
								showContactUsAlert();
							}}
						>
							Contact Us
						</a>
					</li>
				</ul>
				<ul className="navbar-nav ml-auto dropdown-menu-left">
					<li className="nav-item dropdown ">
						<a
							className="nav-link dropdown-toggle"
							href="/"
							id="navbarDropdown"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<UserProvider.Consumer>
								{context =>
									context.user ? (
										<>
											{" "}
											{(context.user as FacultyType).designation}.{" "}
											{context.user.first_name} {context.user.last_name}
										</>
									) : (
										<></>
									)
								}
							</UserProvider.Consumer>
						</a>

						<div
							className="dropdown-menu dropdown-style"
							aria-labelledby="navbarDropdown"
						>
							<Link className="dropdown-item" to="/faculty/profile">
								Profile
							</Link>
							<Link className="dropdown-item" to="/faculty/project/add">
								Add Project
							</Link>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/logout">
								Logout
							</a>
						</div>
					</li>
				</ul>

				{/* <div className="search-box">
            <input className="search-txt mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <span className="search-btn"> <i className="fa fa-search" style={{color:'black'}}></i>
            </span>
        </div> */}
			</div>
		</nav>
	);
};

export default Navbar;
