import React from "react";
import { Radios, RadiosProps } from 'mui-rff';
import { CFieldProps } from './Common';

type CRadioProps = CFieldProps & Partial<RadiosProps>;
export const CRadio = ({ field, isRequired, label, data, ...otherprops }: CRadioProps) => {
    return (
        <Radios
            name={field}
            data={data || []}
            required={isRequired}
            helperText={''}
            radioGroupProps={{ row: true }}
            {...otherprops}
            formControlLabelProps={{ labelPlacement: 'start'}}
        />    
    );
};