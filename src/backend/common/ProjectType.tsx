import { FacultyType } from './UserTypes';


export type ProjectType = {
    uuid_field: string;
    title: string;
    description: string;
    faculty: FacultyType;
    applied: boolean;
    tags: string;
    max_students: number;
    start_date: string;
    end_date: string;
    is_active: boolean;

};
