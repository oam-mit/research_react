import { ApplicantType } from "../../backend/faculty/types/ApplicantType";
import { ACCEPTED, REJECTED } from "../../components/common/ProjectStatus";

type PropsType = {
	applicant: ApplicantType;
	change_application_status: (
		applicant: ApplicantType,
		status: string,
		status_show: string
	) => void;
};

const ApplicationCard = ({
	applicant,
	change_application_status,
}: PropsType) => {
	return (
		<tr>
			<th scope="row">{applicant.registration_number}</th>
			<th>
				{applicant.first_name} {applicant.last_name}
			</th>
			<th>{applicant.department}</th>
			<th>
				<a
					href={applicant.cv}
					target="_blank"
					rel="noreferrer"
					style={{ color: "red" }}
				>
					Click Here
				</a>
			</th>
			<th>
				<a href={`mailto:${applicant.email}`}>{applicant.email}</a>
			</th>
			<th>
				<div className="dropdown show">
					<a
						className="btn btn-info dropdown-toggle"
						href="/"
						role="button"
						id="dropdownMenuLink"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Action
					</a>

					<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
						<button
							onClick={() =>
								change_application_status(applicant, ACCEPTED, "accept")
							}
							className="dropdown-item"
						>
							Accept
						</button>
						<button
							onClick={() =>
								change_application_status(applicant, REJECTED, "reject")
							}
							className="dropdown-item"
						>
							Reject
						</button>
					</div>
				</div>
			</th>
		</tr>
	);
};

export default ApplicationCard;
