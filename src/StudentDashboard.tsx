import React from 'react'
import {Table, Button} from 'react-bootstrap';

export type StudentDashBoardProps = {
	students?: any[];
  toggleEditStudent?: any;
  deleteStudent?: any;
  advanceStudent?: any;
  editingStudent?: any;
};

/**
 * Student Dashboard component
 * Handles displaying student data and user triggered actions (advance, enable edit mode/delete)
 * Requires several functions from the parent to pass back data to update the various hook states.
 * @param param0 
 * @returns 
 */
export const StudentDashboard: React.FunctionComponent<StudentDashBoardProps> = ({students, editingStudent, toggleEditStudent, deleteStudent, advanceStudent})=> { 

    // Controlled Checkbox component so checked can be modified when edit mode is exited or the user being edited changes
    const Checkbox = ({name, value=false, student, handleChange}: any) => {
        return (
            <div>
                <input type="checkbox" id={`${name}-checkbox`} name={name} checked={value} onChange={()=> handleChange(student, value)} />
            </div>
        )
    }

  // Triggered when user checks an edit checkbox
  const handleEditToggled = (student: any, value: boolean) => {
    if (value) {
        toggleEditStudent("");
    } else {
        toggleEditStudent(student.id)
    }
  }

  // Deletes the student when checked.
  // Currently, there is no confirmation prompt
  const handleDeleteChecked = (student: any, value: boolean) => {
    deleteStudent(student)
  }

  const handleAdvanceStudent = (event: React.MouseEvent<HTMLElement>, student: any) => {
    event?.preventDefault()
    if (student.grade < 12) {
      advanceStudent(student)
    }
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Grade</th>
          <th>Classes</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {students?.map((student) => (
        <tr key={student.id}>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>
            {student.grade}
            
            <Button className ="advance-button"       
                onClick={(event)=> handleAdvanceStudent(event, student)} >Advance
            </Button>
          </td>
          <td>{student.classList.length > 0 ? (
            student.classList?.map((studentClass: string, index: string) => (
            <p className='student-class' key={index}>{studentClass}</p>)))
            : (<p></p>)}
          </td>
          <td>
            <Checkbox name={student.id} value={editingStudent.id === student.id} student={student} handleChange={handleEditToggled}>{student.id}</Checkbox>
          </td>
          <td>
            <Checkbox name={student.id} value={false} student={student} handleChange={handleDeleteChecked}>{student.id}</Checkbox>
            
          </td>
          
        </tr>
        ))}
      </tbody>
    </Table>
  )
}
