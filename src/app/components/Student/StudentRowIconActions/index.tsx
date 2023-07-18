import { Student } from "../../../models";
import { makeStyles, createStyles, IconButton, Theme } from "@material-ui/core";
import React, { forwardRef } from "react";
import { CTooltip } from "../../shared/CTooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "azure",
      height: "100%",
    },
  })
);

const CustomIconButton = (props: any, ref: any) => (
  <IconButton {...props} ref={ref} style={{ width: "48px" }}>
    {props.children}
  </IconButton>
);

const CustomIconButtonWithRef = forwardRef(CustomIconButton);

export const StudentRowIconActions = (props: { student: Student, iconActions: TIconAction[] }) => {
  const { student, iconActions } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {iconActions.map((iconAction, idx) => (
        <CTooltip title={iconAction.toolTip} key={idx}>
          <span>
            <CustomIconButtonWithRef
              color="primary"
              onClick={() => iconAction.action(student)}
            >
              {iconAction.icon}
            </CustomIconButtonWithRef>
          </span>
        </CTooltip>
      ))}
    </div>
  );
};
