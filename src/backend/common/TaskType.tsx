import { StudentType } from "./UserTypes";

type TaskType = {
	student: StudentType;
	status: boolean;
	description: string;
	pk: number;
};

export default TaskType;
