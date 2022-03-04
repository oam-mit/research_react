import { StudentType } from "./UserTypes";

type MeetingType = {
	students: StudentType[];
	link: string;
	date_time: string;
	description: string;
};

export default MeetingType;
