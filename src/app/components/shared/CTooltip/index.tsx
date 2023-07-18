import React from 'react';
import { makeStyles, Tooltip, TooltipProps} from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
    arrow: {
        color: '#00205B',
        fontSize: '14px'
    },
    tooltip:{
        backgroundColor: '#00205B',
        fontSize: '14px'
    }
}))
export const CTooltip = (props: TooltipProps) => {
    const clasess = useStyle();

    return(
        <Tooltip arrow classes={clasess} {...{placement: 'bottom',  ...props}} interactive>
            {props.children}
        </Tooltip>
    )
}