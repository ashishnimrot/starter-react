import React from "react";
import { DEFAULT_STUDENT, Nationality, Student } from "../../../models";
import { makeStyles } from "@material-ui/core/styles";
import { StudentCard } from "../StudentCard";
import { CSpinner } from "../../shared/CSpinner";
import { calcWidth } from "../../../utils/template"


const useStyles = makeStyles((theme) => ({
  tObejctContainer: {
    height: "calc(100vh - 197px)",
    fontSize: "14px",
    width: "100%",
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
  collapseButton: {
    maxWidth: "68px",
    flex: "1",
  },
  tableHeader: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#001b4d",
  },
}));

export const StudentList = (props: {
  students: Student[];
  isLoading: boolean;
  iconActions: TIconAction[];
  nationalities: Nationality[]
}) => {
  const classes = useStyles();
  const { students, nationalities, isLoading, iconActions } = props;
  return (
    <div className={classes.tObejctContainer}>
      <div
        className={[
          classes.tObejctHeaderContainer,
          classes.tObjectRow,
          classes.tableHeader,
        ].join(" ")}
      >
        <div className={classes.tObjectRow}>
          <div style={{ minWidth: calcWidth(30, 120) }}>ID</div>
          <div style={{ minWidth: calcWidth(30, 120) }}>First Name</div>
          <div style={{ minWidth: calcWidth(30, 120) }}>Last Name</div>
          <div style={{ minWidth: calcWidth(30, 120) }}>Date of Birth</div>
          {/* <div style={{ minWidth: calcWidth(30, 120) }}>Nationality</div> */}
        </div>
      </div>
      {isLoading ? (
        <CSpinner></CSpinner>
      ) : (
        <div className={classes.tObejctListContainer}>
          {students && students.map((student, i) => (
            <StudentCard key={i} student={student} iconActions={iconActions}></StudentCard>
          ))}
        </div>
      )}
      
    </div>
  );
};
