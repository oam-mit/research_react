import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import "../../assets/home.css";
import logo from "../../assets/iste_logo.png";
import { HomeContext } from "../../backend/student/HomeProvider";
import HomeCard from "../../widgets/student/HomeCard";
import LoadingCard from "../../widgets/common/LoadingCard";
import Footer from "./Footer";
import TopButton from "./TopButton";

const Home = () => {
	const render_departments = () => {
		let department_output = state.departments.map((department, index) => {
			return (
				<HomeCard
					key={index}
					name={department.name}
					slug={department.slug}
					department_building={department.department_building}
				/>
			);
		});

		return department_output;
	};

	let state = useContext(HomeContext);

	return (
		<>
			<title>Home</title>
			<div
				className="jumbotron jumbotron-fluid text-white text-center my-3"
				id="jumbo-color"
			>
				<h3 className="display-1" id="jumbo-text">
					Welcome to the Research Portal!
				</h3>
				<p className="lead my-4" style={{ fontFamily: "Quicksand" }}>
					Finding projects finally made easy!
				</p>
			</div>
			<div className="container section-title-1 text-center m-auto">
				<h1 className="m-auto">Projects sorted department wise!</h1>
			</div>

			<hr />
			<div className="container-fluid">
				<div className="container section-title-1 text-center m-auto">
					<div className="input-group mb-2">
						<div className="input-group-prepend">
							<div className="input-group-text">
								<FontAwesomeIcon icon={faSearch} />
							</div>
						</div>
						<input
							type="text"
							className="form-control"
							id="inlineFormInputGroup"
							placeholder="Search"
							onChange={event => state.search(event.target.value)}
						/>
					</div>
				</div>

				<div className="row">
					{!state.loading ? render_departments() : <LoadingCard count={4} />}
				</div>
			</div>

			<div className="services-section">
				<div className="inner-width">
					<h1 className="section-title">Features</h1>
					<div className="border"></div>

					<div className="services-container">
						<div className="service-box">
							<div className="service-icon">
								<i className="fas fa-paint-brush"></i>
							</div>
							<div className="service-title">Upload CV</div>
							<div className="service-desc">
								Get noticed by top research professors with a single click;
								upload your cv and join us.
							</div>
						</div>

						<div className="service-box">
							<div className="service-icon">
								<i className="fas fa-code"></i>
							</div>
							<div className="service-title">All in one place</div>
							<div className="service-desc">
								Find the best research professors to guide you and help you
								discover new knowledge at every step.
							</div>
						</div>

						<div className="service-box">
							<div className="service-icon">
								<i className="fas fa-brush"></i>
							</div>
							<div className="service-title">Separate Departments</div>
							<div className="service-desc">
								Discover qualified professors from various admired technical
								departments ranging from Computer Science to Biotechnology.
							</div>
						</div>

						<div className="service-box">
							<div className="service-icon">
								<i className="fas fa-object-ungroup"></i>
							</div>
							<div className="service-title">Your Profile</div>
							<div className="service-desc">
								Create your profile, engage with professors, and keep track of
								your activity, information, and interactions here.
							</div>
						</div>

						<div className="service-box">
							<div className="service-icon">
								<i className="fas fa-database"></i>
							</div>
							<div className="service-title">Connect with Professors</div>
							<div className="service-desc">
								Ranging from a brief introduction to arranging a time for
								further discussion, connect and communicate with accomplished
								research professors.
							</div>
						</div>

						{/* <div className="service-box">
							<div className="service-icon">
								<i className="fab fa-android"></i>
							</div>
							<div className="service-title">Another Feature</div>
							<div className="service-desc">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et
								eaque ratione rem porro, nihil.
							</div>
						</div> */}
					</div>
				</div>
			</div>

			<div className="container info-section">
				<div className="row m-auto">
					<div className="col-lg-5">
						<img src={logo} alt="logo" className="m-auto" width="300" />
					</div>

					<div
						className="col-lg-6 m-auto"
						data-aos="fade-left"
						data-aos-offset="300"
						data-aos-duration="800"
						data-aos-easing="ease-in-sine"
					>
						<h1 className="sub-text">
							Indian Society for Technical Education, Manipal
						</h1>

						<p className="style-text">
							A Multi-disciplinary club, Indian Society for Technical Education
							(ISTE) is one of the reputed and esteemed Technical Clubs in
							Manipal. We are well known for hosting ACUMEN, the most popular
							category in TECHTATVA; and various internal/external workshops,
							webinars and, summer and winter schools which help in the overall
							development of our members. We provide a platform for our members
							to learn technical and non-technical skills with great flexibility
							and put forward their ideas into implementation.
						</p>
					</div>

					<hr
						style={{
							border: "1px solid rgb(58, 57, 57)",
							width: "100%",
							margin: "5%",
						}}
					/>
					<div className="col-lg-5 m-auto d-lg-none">
						<img
							src="https://images.shiksha.com/mediadata/images/1602828916phpIjgYq2.jpeg"
							alt="logo"
							className="m-auto d-lg-none"
						/>
					</div>

					<div
						className="col-lg-6 m-auto"
						data-aos="fade-right"
						data-aos-offset="300"
						data-aos-duration="800"
						data-aos-easing="ease-in-sine"
					>
						<h1 className="sub-text">Manipal Insitute of Technology</h1>
						<p className="style-text">
							The Manipal Institute of Technology (MIT), Manipal was established
							in 1957 as one of the first self-financing engineering colleges in
							the country. MIT offers a Bachelor’s and Master’s program in
							engineering streams. It also gives students the option to carry
							out full-time or part-time research. The institute undertakes
							sponsored research programs supported by funding agencies such as
							DST, CSIR, AICTE, and the Ministry of Environmental Sciences. It
							has collaborative research programs in association with premier
							research laboratories and institutes in India and abroad.
						</p>
					</div>

					<div className="col-lg-5 m-auto d-none d-lg-block images-mobile">
						<img
							src="https://images.shiksha.com/mediadata/images/1602828916phpIjgYq2.jpeg"
							alt="logo"
							className="m-auto d-none d-lg-block images-mobile"
						/>
					</div>
				</div>
			</div>

			<TopButton />
			<Footer />
		</>
	);
};

export default Home;
