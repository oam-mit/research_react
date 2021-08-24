import { ApplicantType } from "../../backend/faculty/types/ApplicantType";
import { showFeedback } from "../../services/AlertService";

type PropsType = {
	applicant: ApplicantType;
};

const AcceptedApplicationCard = ({ applicant }: PropsType) => {
	return (
		<tr key={applicant.registration_number}>
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
				<a
					href={applicant.feedback}
					target="_blank"
					rel="noreferrer"
					style={{ color: "red" }}
				>
				<button onClick={showFeedback} style={{ color: "red", border: "none", backgroundColor: "white", outline: "none"}}>Click Here</button>
				</a>
			</th>
		</tr>
	);
};

export default AcceptedApplicationCard;
