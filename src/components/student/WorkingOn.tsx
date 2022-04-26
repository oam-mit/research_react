import { useContext } from "react";
import { WorkingOnContext } from "../../backend/student/WorkingOnProvider";
import Jumbotron from "../../widgets/common/Jumbotron";
import WorkingOnProjectCard from "../../widgets/student/WorkingOnProjectCard";
import Spinner from "../common/Spinner";

const WorkingOn = () => {
	let state = useContext(WorkingOnContext);

	return (
		<>
			<title>Your Projects</title>
			<Jumbotron
				title="Your Projects"
				subtitle="All the projects you are working on/have worked on"
			/>

			{state.loading ? (
				<Spinner size={100} position={"absolute"} />
			) : (
				<div className="container-fluid">
					<div className="row">
						{state.projects.map((project) => (
							<WorkingOnProjectCard
								project={project}
								key={project.uuid_field}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default WorkingOn;
