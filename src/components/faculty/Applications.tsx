import { useContext } from "react";
import { useHistory, useParams } from "react-router";
import {
	ApplicationsContext,
	ContextType,
} from "../../backend/faculty/ApplicationsProvider";
import UserProvider from "../../providers/UserProvider";
import ApplicationCard from "../../widgets/faculty/ApplicationsCard";
import Spinner from "../common/Spinner";

const Applications = () => {
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
								<th scope="col">View CV</th>
								<th scope="col">Email ID</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{state.applications.map(applicant => {
								return (
									<ApplicationCard
										applicant={applicant}
										change_application_status={state.change_applicant_status}
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

	let state = useContext(ApplicationsContext);
	let history = useHistory();
	let params = useParams<{ project_uuid: string }>();

	return (
		<>
			<title>Applications</title>
			<div
				className="jumbotron jumbotron-fluid text-white text-center my-3"
				id="jumbo-color"
			>
				<h3 className="display-1" id="jumbo-text">
					Pending Applicantions
				</h3>
				<button
					onClick={() =>
						history.push(
							`/faculty/applications/accepted/${params.project_uuid}`
						)
					}
					className="btn-mystyle"
				>
					<h5>View Accepted Applicants</h5>
				</button>
			</div>
			<div className="container">
				<div className="row justify-content-center">
					<div className="btn-grp dropdown show">
						<a
							className="btn dropdown-toggle"
							href="/"
							role="button"
							id="dropdownMenuMakeInactive"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<h5>{state.project_title}</h5>
						</a>

						<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
							<button className="btn btn-danger">Make Project Inactive</button>
						</div>
					</div>
				</div>
				<div className="table-scroll">{render_applications(state)}</div>
			</div>
		</>
	);
};

Applications.contextType = UserProvider;

export default Applications;
