import { TextField, TextFieldProps } from 'mui-rff';
import React, { forwardRef } from 'react';
import { CFieldProps } from './Common';
import { CTooltip } from '../CTooltip';

type CTextFieldProps = CFieldProps & Partial<TextFieldProps>;
class CustomTextField extends React.Component<CTextFieldProps> {
    render() {
        const { field, isRequired, label, ...otherprops } = this.props;

        return (
            <TextField id={`op-${field}`} name={field} label={label} fullWidth required={isRequired} {...otherprops} />
        );
    }
}

export const CtextField = forwardRef((props: CTextFieldProps, ref: any) => (
    <CTooltip title={props.description}>
        <CustomTextField {...props} ref={ref}></CustomTextField>
    </CTooltip>
));