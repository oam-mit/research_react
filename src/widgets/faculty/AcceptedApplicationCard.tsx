import { ApplicantType } from "../../backend/faculty/types/ApplicantType";

const AcceptedApplicationCard = ({
	applicant,
}: {
	applicant: ApplicantType;
}) => {
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
		</tr>
	);
};

export default AcceptedApplicationCard;
