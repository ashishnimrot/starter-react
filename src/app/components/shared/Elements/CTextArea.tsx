import { TextField, TextFieldProps } from 'mui-rff';
import React, { forwardRef } from 'react';
import { CFieldProps } from './Common';
import { CTooltip } from '../CTooltip'; 

type CTextFieldProps = CFieldProps & Partial<TextFieldProps>;
class CustomTextArea extends React.Component<CTextFieldProps> {
    render() {
        const { field, isRequired, label, ...otherProps } = this.props;
        return (
            <TextField
                id={`op-${field}`}
                name={field}
                label={label}
                fullWidth
                required={isRequired}
                multiline
                rowsMax={6}
                rows={3}
                {...otherProps}
            />    
        );
    }
}

export const CtextArea = forwardRef((props: CTextFieldProps, ref: any) => (
    <CTooltip title={props.description}>
        <CustomTextArea {...props} ref={ref}></CustomTextArea>
    </CTooltip>
));


