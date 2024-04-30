import React, {useState, useEffect} from 'react'
import { ModifyStudentForm } from './ModifyStudentForm';
export type EditStudentProps = {
	editStudent?: any;
    currentUser?: any;
};

/**
 * Form to Edit Student Data
 * When a student is selected to be editing, their infomation is used to pre-populate the form's fields.
 */
export const EditStudent: React.FunctionComponent<EditStudentProps> = ({editStudent, currentUser})=> {
    const initialState = {id: null, firstName: '', lastName: '', grade: 1, classList: ''};
    // Form state can't be defined in the shared form because useEffect must be a top level function
    const [formData, setFormData] = useState(currentUser);

    // Track form data so toggling between user to edit will update the form fields appropriately
    useEffect(()=> {
        setFormData(currentUser)
    }, [currentUser])

    return (
        <ModifyStudentForm action="EDIT" handleAction={()=>editStudent(formData, currentUser?.id)} formData={formData} setFormData={setFormData} initialState={initialState}/>
    )

}