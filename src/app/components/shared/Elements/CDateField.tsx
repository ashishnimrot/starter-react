import { KeyboardDatePicker, KeyboardDatePickerProps } from 'mui-rff';
import React, { forwardRef } from 'react';
import { CFieldProps } from './Common';
import { CTooltip } from '../CTooltip';

type CDateFieldProps = CFieldProps & Partial<KeyboardDatePickerProps>;
class CustomDateField extends React.Component<CDateFieldProps> {
    render() {
        const { field, isRequired, label, ...otherprops } = this.props;

        return (
            <KeyboardDatePicker 
            variant="inline" 
            id="op-date-picker-inline" 
            name={field} 
            label={label} 
            views={['year', 'month', 'date']}
            fullWidth 
            format="dd/MM/yyyy"
            required={isRequired} 
            {...otherprops} />
        );
    }
}

export const CDateField = forwardRef((props: CDateFieldProps, ref: any) => (
    <CTooltip title={props.description}>
        <CustomDateField {...props} ref={ref}></CustomDateField>
    </CTooltip>
));