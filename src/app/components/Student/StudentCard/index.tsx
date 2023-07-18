import React from "react";
import { Student } from "../../../models";
import { makeStyles } from "@material-ui/core/styles";
import { calcWidth } from "../../../utils/template";
import { StudentRowIconActions } from "../StudentRowIconActions";
import { Collapse, Grid, Box, Button } from "@material-ui/core";
import { toDateDDMMYYY } from "../../../utils/date.extension";

const useStyles = makeStyles((theme) => ({
  tObejctCardContainer: {
    borderRadius: "4px",
    border: "none",
    marginBottom: "8px",
    borderBottom: "1px solid rgba(10, 10, 10, 0.1)",
    borderShadow: " 0 2px 8px 0 rgba(0, 0, 0, 0.14)",
    position: "relative",
    cursor: "pointer",
    borderLeft: "4px solid white",
    "&:hover": {
      "& $floatingActions": {
        display: "block",
        zIndex: 100,
        position: "absolute",
        float: "right",
        right: "35px",
        marginTop: "-48px",
      },
    },
  },
  tObejctListContainer: {
    height: "calc(100% - 48px)",
    overflowY: "auto",
  },
  tObejctHeaderContainer: {
    position: "sticky",
    marginLeft: "4px",
    marginRight: "17px",
  },
  tObejctInfoContainer: {
    fontSize: "14px",
  },
  tObjectRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "48px",
    lineHeight: "48px",
  },
  tObjectItem: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    height: "48px",
  },
  collapseButton: {
    maxWidth: "68px",
    flex: "1",
  },
  tableHeader: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#001b4d",
  },
  tFirstItem: {
    paddingLeft: "16px",
  },
  floatingActions: {
    display: "none",
    borderLeft: "28px solid azure",
    borderRadius: "28px",
    height: "100%",
  },
}));

export const StudentCard = (props: {
  student: Student;
  iconActions: TIconAction[];
}) => {
  const classes = useStyles();
  const { student, iconActions } = props;
  const [open, setOpen] = React.useState(false);
  const totalPadding = 64;
  return (
    <>
      <div
        className={classes.tObejctCardContainer}
        style={{ borderLeftColor: "#D68910" }}
      >
        <div className={classes.tObjectRow} onClick={() => setOpen(!open)}>
          <div
            style={{ minWidth: calcWidth(30, 120, totalPadding) }}
            className={[classes.tObjectItem, classes.tFirstItem].join(" ")}
          >
            {student.ID}
          </div>
          <div
            style={{ minWidth: calcWidth(30, 120, totalPadding) }}
            className={[classes.tObjectItem].join(" ")}
          >
            {student.firstName}
          </div>
          <div
            style={{ minWidth: calcWidth(30, 120, totalPadding) }}
            className={[classes.tObjectItem].join(" ")}
          >
            {student.lastName}
          </div>
          <div
            style={{ minWidth: calcWidth(30, 120, totalPadding) }}
            className={[classes.tObjectItem].join(" ")}
          >
            {toDateDDMMYYY(new Date(student.dateOfBirth))}
          </div>
          {/* <div
            style={{ minWidth: calcWidth(30, 120, totalPadding) }}
            className={[classes.tObjectItem].join(" ")}
          >
            {student.nationality ? student.nationality.Title : ''}
          </div> */}
        </div>
        {!open && (
          <div className={classes.floatingActions}>
            <StudentRowIconActions
              student={student}
              iconActions={iconActions}
            ></StudentRowIconActions>
          </div>
        )}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={4}>
            <Grid container spacing={2}>
              Show Basic Details of Students
            </Grid>
            <Grid container spacing={2} justify="flex-end">
              {iconActions.map((item, idx) => (
                <Grid item xs={2} key={idx}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => item.action(student)}
                    size="small"
                    startIcon={item.icon}
                  >
                    {item.toolTip}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Collapse>
      </div>
    </>
  );
};
