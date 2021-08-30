interface UserType {
	email: string;
	department: string;
	first_name: string;
	last_name: string;
	is_faculty: boolean;
	is_student: boolean;
}

export interface FacultyType extends UserType {
	profile_picture: string;
	designation: string;
}

export interface StudentType extends UserType {
	registration_number: string;
	cv: string;
	domains_of_interest: string | null;
}
