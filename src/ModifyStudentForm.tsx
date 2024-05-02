import React from 'react'
import {Form, Button} from 'react-bootstrap';
export type ModifyStudentFormProps = {
	action: "ADD" | "EDIT";
    handleAction: any;
    formData: any;
    setFormData: any;
    initialState: any;
};

/**
 * Shared Form for Adding/Editing a student
 * It takes an action (ADD/EDIT) and a function call to handle that specific action on submit
 * The formData state is passed in from both add and edit as edit needs to use it inside the useEffect hook, which must be top level
 */
export const ModifyStudentForm: React.FunctionComponent<ModifyStudentFormProps> = ({action, handleAction, formData, setFormData, initialState})=> {
    const handleInputChange = (event: any) => {
        const {name, value} = event?.target;
        if (name === 'classList') {
            // Split classes by comma and strip off leading whitespace.
            const classesArray = value.split(",").map((item: string) => item.trimStart())
            // Store each class as an array element
            setFormData({...formData, 'classList': classesArray})
        } else {
            setFormData({...formData, [name]: value})
        }
    }

  return (
    <>
    {action === "ADD" ? (
    <h4>Add Student</h4>
    ) : (
    <h4>Edit Student</h4>
    )}
   <Form
    onSubmit={(event) => {
        event.preventDefault();
        // Don't allow the form to be submitted without firstName, lastName and grade, classes can be added later
        if (!formData.firstName || !formData.lastName || !formData.grade) return;
            // Call the specific action for add/edit
            handleAction();        
            setFormData(initialState);
        }}
   >
    <Form.Label className="modify-student-label">First Name</Form.Label>
    <Form.Control className="student-input"
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
    />
    <Form.Label className="modify-student-label">Last Name</Form.Label>
    <Form.Control className="modify-student-input"
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
    />
    <Form.Label className="modify-student-label">Grade</Form.Label>
    <Form.Control className="modify-student-input"
        type="number"
        max="12"
        min="1"
        name="grade"
        value={formData.grade}
        onChange={handleInputChange}
    />
    <Form.Label className="modify-student-label">Classes</Form.Label>
    <Form.Control className="modify-student-input"
        type="string"
        name="classList"
        value={formData.classList}
        onChange={handleInputChange}
        aria-describedby="classesHelpBlock"
    />
    <Form.Text id="classesHelpBlock" className="modify-classes-text" muted>
        Enter classes separated by commas.
    </Form.Text>
    <p>
        {action === "ADD" ? (
        <Button className="modify-student-button" type="submit">Add Student</Button>
        ) : (
        <Button className="modify-student-button" type="submit">Edit Student</Button>
        )}
    </p>
   </Form>
   </>
  )
}