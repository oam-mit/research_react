import { useContext } from "react";
import { WorkingOnContext } from "../../backend/student/WorkingOnProvider";
import WorkingOnProjectCard from "../../widgets/student/WorkingOnProjectCard";
import Spinner from "../common/Spinner";

const WorkingOn = () => {
	let state = useContext(WorkingOnContext);

	return (
		<>
			<title>Your Projects</title>
			<div
				className="jumbotron jumbotron-fluid text-white text-center my-3"
				id="jumbo-color"
			>
				<h3 className="display-1" id="jumbo-text">
					Projects
				</h3>
				<p className="lead my-4" style={{ fontFamily: "Quicksand" }}>
					All the projects you are working on / have worked on
				</p>
			</div>

			{state.loading ? (
				<Spinner size={100} position={"absolute"} />
			) : (
				<div className="container-fluid">
					<div className="row">
						{state.projects.map((project) => (
							<WorkingOnProjectCard project={project} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default WorkingOn;
