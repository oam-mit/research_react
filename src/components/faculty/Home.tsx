import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import NoProjects from "../../backend/common/NoProjectToShow";
import { HomeContext } from "../../backend/faculty/HomeProvider";
import LoadingCard from "../../widgets/common/LoadingCard";
import HomeCard from "../../widgets/faculty/HomeCard";

const Home = () => {
	const [activeProjectsShown, setactiveProjectsShown] = useState<boolean>(true);
	const [pastProjectsShown, setpastProjectsShown] = useState<boolean>(false);
	let state = useContext(HomeContext);
	const history = useHistory();

	const render_active_projects = () => {
		if (state.loading) {
			return <LoadingCard count={4} />;
		}
		if (activeProjectsShown) {
			if (state.active_projects.length > 0) {
				let projects = state.active_projects.map(project => (
					<HomeCard project={project} />
				));

				return projects;
			} else {
				return <NoProjects message={"No Active projects to Show"} />;
			}
		} else {
			return <></>;
		}
	};

	const render_past_projects = () => {
		if (state.loading) {
			return <LoadingCard count={4} />;
		}
		if (pastProjectsShown) {
			if (state.past_projects.length > 0) {
				let output = state.past_projects.map(project => (
					<HomeCard project={project} />
				));

				return output;
			} else {
				return <NoProjects message={"No Past Project to show"} />;
			}
		} else {
			return <></>;
		}
	};

	const render_arrow = (variable: boolean) => {
		if (variable) {
			return <FontAwesomeIcon icon={faAngleDown} color={"black"} />;
		} else {
			return <FontAwesomeIcon icon={faAngleUp} color={"black"} />;
		}
	};

	const toggle_show_variable = (variable: string) => {
		switch (variable) {
			case "active_projects_shown":
				setactiveProjectsShown(!activeProjectsShown);
				break;
			case "past_projects_shown":
				setpastProjectsShown(!pastProjectsShown);

				break;

			default:
				console.log("not a valid input");
		}
	};

	useEffect(() => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}, []);

	useEffect(() => {
		if (pastProjectsShown) {
			document.body.scrollTop += 300;
			document.documentElement.scrollTop += 300;
		}
	}, [pastProjectsShown]);

	return (
		<>
			<title>Faculty | Home</title>
			<div
				className="jumbotron jumbotron-fluid text-white text-center my-3"
				id="jumbo-color"
			>
				<h3 className="display-1" id="jumbo-text">
					Your Projects
				</h3>
				<p className="lead my-4" style={{ fontFamily: "Quicksand" }}>
					View applications and add more!
				</p>
				<br />

				<button
					onClick={() => history.push("/faculty/project/add")}
					className="btn-mystyle"
				>
					{" "}
					<h5>Add Project</h5>{" "}
				</button>
			</div>

			<div className="container-fluid">
				<div className="row text-center">
					<div className="col-12">
						<h2
							className="sub-heading-faculty"
							onClick={() => toggle_show_variable("active_projects_shown")}
							style={{ cursor: "pointer" }}
						>
							Active Projects {render_arrow(activeProjectsShown)}
						</h2>
					</div>
				</div>
				<div className="row align-items-center">{render_active_projects()}</div>
			</div>

			<div className="container-fluid">
				<div className="row text-center">
					<div className="col-12">
						<h2
							className="sub-heading-faculty"
							onClick={() => toggle_show_variable("past_projects_shown")}
							style={{ cursor: "pointer" }}
						>
							Past Projects {render_arrow(pastProjectsShown)}
						</h2>
					</div>
				</div>
				<div className="row">{render_past_projects()}</div>
			</div>
		</>
	);
};

export default Home;
