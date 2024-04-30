import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModifyStudentForm } from '../ModifyStudentForm';

// mock Data and functions for props required in ModifyStudentForm
const mockFormData = {
    firstName: "Jane",
    lastName: "Smith",
    grade: 3,
    classes: "math, science"
}

const initialState = {id: "1", firstName: '', lastName: '', grade: 1, classList: ''};

const mockHandleAction = jest.fn();

const mockSetFormData = jest.fn();

describe('ModifyStudentForm', () => {
    it('renders the correct title when add is passed in', () => {
        render(<ModifyStudentForm action={"ADD"} handleAction={mockHandleAction} formData={mockFormData} setFormData={mockSetFormData} initialState={initialState}/>)
        const data = screen.getAllByText('Add Student')
        expect(data[0]).toBeInTheDocument();
    });
    it('Does not render edit when add is passed in', () => {
        render(<ModifyStudentForm action={"ADD"} handleAction={mockHandleAction} formData={mockFormData} setFormData={mockSetFormData} initialState={initialState}/>)
        const data = screen.queryByText('Edit Student')
        expect(data).not.toBeInTheDocument();
    });
  });

