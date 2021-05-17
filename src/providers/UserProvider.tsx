import React from 'react';
import { FacultyType, StudentType } from '../backend/common/UserTypes';

export interface StateType
{
    loading:boolean;
    user:StudentType | FacultyType | null;
    getCookie:(name:string)=>string | null;
}

let UserProvider=React.createContext<StateType> ({
    loading:true,
    user:null,
    getCookie:(name:string)=>null
});

export default UserProvider;

