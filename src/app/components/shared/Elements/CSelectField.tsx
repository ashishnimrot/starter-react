import { Select, SelectProps } from 'mui-rff';
import React, { forwardRef } from 'react';
import { CFieldProps } from './Common';
import { CTooltip } from '../CTooltip';

export interface IData {
    label: string;
    value: string;
    disabled?: boolean;
}

type CSelectFieldProps = CFieldProps & Partial<SelectProps>;
class CustomSelectField extends React.Component<CSelectFieldProps> {
    render() {
        const { field, isRequired, options, label, ...otherProps } = this.props;

        const data = (options || []).map((option) => {
            if (option && option.label && option.value) {
                return {
                    label: option.label,
                    value: option.value
                };
            }
            if (option && option.value) {
                return {
                    label: `${option.value}${option.description ? ` - ${option.description}`: ''}`,
                    value: option.value
                };
            }
            return {
                label: option,
                value: option
            };
        }) as IData[];
        
        return (
            <Select 
                label={label}
                name={field}
                required={isRequired}
                data={data}
                multiple={false}
                helperText=""
                {...otherProps}
            />
        );
    }
}

export const CSelectField = forwardRef((props: CSelectFieldProps, ref: any) => (
    <CTooltip title={props.description} placement={'left'}>
        <CustomSelectField {...props} ref={ref}></CustomSelectField>
    </CTooltip>
));

