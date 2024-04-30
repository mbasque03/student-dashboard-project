import React, {useState} from 'react'
import { ModifyStudentForm } from './ModifyStudentForm';
export type AddStudentProps = {
	addStudent?: any;
};

/**
 * Form to add a new student. It is always displayed when a student is not being edited
 */
export const AddStudent: React.FunctionComponent<AddStudentProps> = ({addStudent})=> {
    const initialState = {id: null, firstName: '', lastName: '', grade: 1, classList: ''};
    const [formData, setFormData] = useState(initialState);

return (
    <ModifyStudentForm action="ADD" handleAction={()=>addStudent(formData)} formData={formData} setFormData={setFormData} initialState={initialState} />
)
}