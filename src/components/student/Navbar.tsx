import React from "react";
import logo from "../../assets/iste_logo.png";
import { Link, NavLink } from "react-router-dom";
import "../../assets/navbar.css";
import UserProvider from "../../providers/UserProvider";

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
				<img
					src={logo}
					className="img-responsive logo"
					alt="Iste logo"
					height={100}
				/>
			</a>

			<a
				className="navbar-brand"
				href="/"
				onClick={event => event.preventDefault()}
			>
				ISTE Manipal
			</a>

			<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
				<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
					<li className="nav-item">
						<NavLink
							activeClassName="active"
							className="nav-link"
							to="/student/home"
						>
							Home
						</NavLink>
					</li>
					<li className="nav-item">
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
					</li>
				</ul>
				<ul className="navbar-nav ml-auto">
					<li className="nav-item dropdown">
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
											{context.user.first_name} {context.user.last_name}
										</>
									) : (
										<></>
									)
								}
							</UserProvider.Consumer>
						</a>

						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<Link className="dropdown-item" to="/student/profile">
								Profile
							</Link>
							<Link className="dropdown-item" to="/student/applications">
								Applications
							</Link>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/logout">
								Logout
							</a>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
