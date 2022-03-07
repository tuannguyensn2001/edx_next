import { createContext, useContext } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { ICourse } from 'models/ICourse';

interface Context {
    control: Control<ICourse>;
    setValue: UseFormSetValue<ICourse>;
}

const FormCourseContext = createContext<Context | null>(null);

export default function useFormCourseContext() {
    return useContext(FormCourseContext);
}

export const FormCourseContextProvider = FormCourseContext.Provider;
