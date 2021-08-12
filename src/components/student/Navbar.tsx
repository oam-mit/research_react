import React from "react";
import logo from "../../assets/iste_logo.png";
import { Link, NavLink } from "react-router-dom";
import "../../assets/navbar.css";
import UserProvider from "../../providers/UserProvider";
import { showReactAlert } from "../../services/AlertService";

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
					{/* <li className="nav-item">
						<a className="nav-link" href="/">
							About Us
						</a>
					</li> */}
					{/* <li className="nav-item">
						<a className="nav-link" href="/">
							Blogs
						</a>
					</li> */}
					{/* <li className="nav-item">
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
								showReactAlert(
									"Contact Details",
									<>
										<table
											className={'table'}
											style={{
												width: "100%",
												fontFamily: "arial, sans-serif",
												borderCollapse: "collapse",
											}}
										>
											<tr>
												<th>Name</th>
												<th>Contact Number</th>
											</tr>
											<tr>
												<td>Omkar Masur</td>
												<td>+919930147279</td>
											</tr>
											<tr>
												<td>Insha Manowar</td>
												<td>+91352453653</td>
											</tr>
											<tr>
												<td>Tinku Chowdhary</td>
												<td>+91205924850</td>
											</tr>
										</table>

										<span>OR</span>
										<br />
										<button className={"mt-1 btn btn-primary"}>
											{" "}
											<a href={"mailto:contactus@istemanipal.com"}>MAIL US </a>
										</button>
										<br />
									</>,
									"info"
								);
							}}
						>
							Contact Us
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
