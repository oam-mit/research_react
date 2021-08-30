import { useContext } from "react";
import { useHistory, useParams } from "react-router";
import {
	AcceptedApplicationsContext,
	ContextType,
} from "../../backend/faculty/AcceptedApplicationsProvider";
import UserProvider from "../../providers/UserProvider";
import AcceptedApplicationCard from "../../widgets/faculty/AcceptedApplicationCard";
import Spinner from "../common/Spinner";

const AcceptedApplications = () => {
	const render_applications = (state: ContextType) => {
		if (!state.loading) {
			if (state.isAllowed) {
				return (
					<table className="table table-bordered table-style table-scroll">
						<thead>
							<tr className="bg-primary">
								<th scope="col">Registration Number</th>
								<th scope="col">Name</th>
								<th scope="col">Branch</th>
								<th>Domains of Interest</th>
								<th scope="col">View CV</th>
								<th scope="col">Email ID</th>
								<th scope="col">Feedback</th>
							</tr>
						</thead>
						<tbody>
							{state.applications.map((applicant, index) => {
								return (
									<AcceptedApplicationCard
										feebackHandler={state.feedbackHandler}
										key={index}
										applicant={applicant}
									/>
								);
							})}
						</tbody>
					</table>
				);
			} else {
				return (
					<div className="row">
						<div className="col-12 text-center">
							<h3>
								You are not allowed to view this. If you think this is an error,
								kindly contact us.
							</h3>
						</div>
					</div>
				);
			}
		} else {
			return <Spinner size={50} position={"relative"} />;
		}
	};

	let history = useHistory();
	let params = useParams<{ project_uuid: string }>();
	let state = useContext(AcceptedApplicationsContext);

	return (
		<>
			<title>Applications</title>
			<div
				className="jumbotron jumbotron-fluid text-white text-center my-3"
				id="jumbo-color"
			>
				<h3 className="display-1" id="jumbo-text">
					Accepted Applicants
				</h3>
				<button
					onClick={() =>
						history.push(`/faculty/applications/${params.project_uuid}`)
					}
					className="btn-mystyle"
				>
					<h5>View Applicants</h5>
				</button>
			</div>
			<div className="container">
				<div className="table-scroll">{render_applications(state)}</div>
			</div>
		</>
	);
};

AcceptedApplications.contextType = UserProvider;

export default AcceptedApplications;
