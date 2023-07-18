import { ShowErrorFunc, ShowErrorProps } from 'mui-rff';
import { ReactElement } from 'react';
import { IData } from './CSelectField';

export interface CFieldProps {
    field: string;
    isRequired?: boolean;
    options?: any[] | IData[];
    label: string;
    description: string | ReactElement;
    helperText?: any;
    showError?: ShowErrorFunc;
    disabled?: boolean;
}

export function showErrorEvenIfUntouched({
    meta: { submitError, dirtySinceLastSubmit, error, touched, modified }
}: ShowErrorProps) {
    return !!((submitError && !dirtySinceLastSubmit) || error);
}