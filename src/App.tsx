import React, { useState } from 'react';
import './css/App.css';
import uuidv4 from 'uuid-random';
import { StudentDashboard } from './StudentDashboard';
import { AddStudent } from './AddStudent';
import { EditStudent } from './EditStudent'

/**
 * Top level of Student Dashboard App
 * Sets up hooks to track state and loads initial components
 */
function App() {

  const initialDashboardData = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      grade: 10, 
      classList: ["Math", "English", "Choir" ]
    },
    {
      id: 2,
      firstName: "Lisa",
      lastName: "Jordan",
      grade: 8,
      classList: ["Math", "Science", "French", "English" ]
    }
  ]

  // State tracking for student data
  const [students, setStudents] = useState<any[]>(initialDashboardData)
  // State tracking for which student has enabled edit mode (if any)
  const [editingStudent, setEditingStudent] = useState({})


  /*A Series of Helper functions that are passed down to various components and executed when they perform various actions. 
    These functions need to run at the top level to handle state and trigger component changes*/

  // Update student data after the add action has been performed
  const handleAddStudent = (student: any) => {
    student.id = uuidv4();
    setStudents(prevStudents => [...prevStudents, student])
  }

  // Update student data when a user is modified. 
  // Then disables edit mode
  const handleEditStudent = (updatedStudentInfo: any, id: string) => {
    setStudents(students.map((student) => (student.id === id ? updatedStudentInfo : student)))
    setEditingStudent({});
  }

  // Removes student data when the delete action is modified
  // If another user is in edit mode, this is also disabled
  const handleDeleteStudent = (deletedStudent: any) => {
    const updatedStudents = students?.filter((student) => student.id !== deletedStudent.id);
    setStudents(updatedStudents);
    setEditingStudent({});
  }

  // Enables edit mode and updates state data with the student to be edited
  const handleSetEditingStudent = (id: any) => {
    if (id) {
      setEditingStudent(students?.find((student) => student.id === id));
    } else {
      setEditingStudent({});
    }
  }

  // Updates student data when a student advances a grade
  const handleAdvanceStudent = (studentToAdvance: any) => {
    ++studentToAdvance.grade;
    setStudents(students.map((student) => (student.id === studentToAdvance.id ? studentToAdvance : student)))
  }

  // If edit mode is enabled, the edit form is shown with current user data. In all other cases, show the add user form.
  return (
  <div>
    <StudentDashboard students={students} editingStudent={editingStudent} toggleEditStudent={handleSetEditingStudent} deleteStudent={handleDeleteStudent} advanceStudent={handleAdvanceStudent}  />
    {(Object.keys(editingStudent).length !==0) ? (
    <EditStudent editStudent={handleEditStudent} currentUser={editingStudent} />
    ) : (
    <AddStudent addStudent={handleAddStudent} />
    )}
  </div>
  )
}

export default App;
