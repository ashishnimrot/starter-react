import { StudentList } from "../../components/Student/StudentList";
import { DEFAULT_STUDENT, Nationality, Student } from "../../models";
import React from "react";
import { Grid, Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { CTooltip } from "../../components/shared/CTooltip";
import AddIcon from "@material-ui/icons/Add";
import { Visibility } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import { StudentForm } from "../../components/Student/StudentForm";
import { StudentService } from "../../services/student.service";
import { useSelector } from "react-redux";
import { AppUserSelectors } from "../../stores/user";
import { NotificationService } from "../../services/notifications.service";

export const Home = () => {
  const userRole = useSelector(AppUserSelectors.getRole);
  const [students, setStudents] = React.useState([] as Student[]);
  const [student, setStudent] = React.useState({} as Student);
  const [openForm, setFormVisibilty] = React.useState(false);
  const [nationalities, setNationalities] = React.useState([] as Nationality[]);

  const handleEditStudent = async (student: Student) => {
    const studentWithDetails = await StudentService.getStudentDetails(student);
    setStudent(studentWithDetails);
    setFormVisibilty(true);
  };

  const handleNewStudentFormOpen = () => {
    setStudent(DEFAULT_STUDENT);
    setFormVisibilty(true);
  };
  const handleNewStudentFormClose = () => {
    setStudent(DEFAULT_STUDENT);
    setFormVisibilty(false);
  };

  const saveStudent = async (_student: Student) => {
    await StudentService.saveStudent(student, _student);
    loadAllDetails();
    NotificationService.showSuccess("Student data submited!")
  };

  const iconActions: TIconAction[] = [
    {
      icon: userRole === "Admin" ? <Visibility /> : <EditIcon />,
      action: (student: Student) => {
        handleEditStudent(student);
      },
      toolTip: userRole === "Admin" ? "View Student Info" : "Edit Student",
    },
  ];

  const loadAllDetails = () => {
    StudentService.getAllDetails().then(({ students, nationalities }) => {
      setStudents(students);
      setNationalities(nationalities);
    });
  };

  React.useEffect(() => {
    loadAllDetails();
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <Grid container spacing={4} direction="column">
        <Grid container item xs justify="space-around">
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-end"
            spacing={4}
          >
            <Grid item xs={4} container>
              <div style={{ paddingRight: "32px" }}>
                <div
                  style={{
                    color: "#001b4d",
                    fontSize: "13px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  No of Students
                </div>
                {students.length == 0 ? <Skeleton /> : students.length}
              </div>
            </Grid>
            <Grid
              item
              xs={8}
              container
              direction="row"
              alignItems="center"
              justify="flex-end"
            >
              <CTooltip title="Create new Student">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleNewStudentFormOpen}
                >
                  New Student
                </Button>
              </CTooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs>
          <StudentList
            nationalities={nationalities}
            students={students}
            iconActions={iconActions}
            isLoading={students.length == 0}
          />
        </Grid>
      </Grid>
      <StudentForm
        saveStudent={saveStudent}
        student={student}
        nationalities={nationalities}
        open={openForm}
        close={handleNewStudentFormClose}
        readOnly={userRole === "Admin"}
      ></StudentForm>
    </div>
  );
};
