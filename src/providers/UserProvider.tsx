import React from "react";
import { FacultyType, StudentType } from "../backend/common/UserTypes";

export interface StateType {
	loading: boolean;
	user: StudentType | FacultyType | null;
	getCookie: (name: string) => string | null;
	updateUser: (user: StudentType | FacultyType | null) => void;
}

let UserProvider = React.createContext<StateType>({
	loading: true,
	user: null,
	getCookie: (name: string) => null,
	updateUser: () => {},
});

export default UserProvider;
