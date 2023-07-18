import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Nationality, Student } from "../../../models";
import { Form, Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { CtextField } from "../../shared/Elements/CTextField";
import {
  CFieldProps,
  showErrorEvenIfUntouched,
} from "../../shared/Elements/Common";
import { CSelectField, IData } from "../../shared/Elements/CSelectField";
import { CDateField } from "../../shared/Elements/CDateField";
import { CTooltip } from "../../shared/CTooltip";
import { reduceObjectArrayToObject } from "../../../utils/array.extension";
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import { format, isValid, toDate } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "fit-content",
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
    dialogTitle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }
  })
);
const relationships = ["Parent", "Sibling", "Spouse"];

const RenderDatePicker = ({ name, input, input: { value, onChange } }: any) => {
  return (
    <DatePicker
      locale="de"
      placeholderText="Date Of Birth"
      dateFormat="P"
      selected={value && isValid(value) ? toDate(value) : null}
      disabledKeyboardNavigation
      name={name}
      onChange={(date:any) => {
        if (isValid(date)) {
          input.onChange(format(new Date(date), "dd-MM-yyyy"));
        } else {
          input.onChange(null);
        }
      }}
    />
  );
};

export const StudentForm = (props: {
  open: boolean;
  close: () => void;
  student: Student;
  nationalities: Nationality[];
  saveStudent: (student: Student) => void;
  readOnly: boolean;
}) => {
  const classes = useStyles();
  const { open, close, student, nationalities, saveStudent, readOnly } = props;
  const isEdit = student.ID === 0 ? false : true;

  const hadleFormSubmit = (student: Student) => {
    saveStudent(student);
    close();
  };

  const config: CFieldProps[] = [
    {
      field: "firstName",
      isRequired: true,
      label: "First name",
      description: "Enter student first name",
      showError: showErrorEvenIfUntouched,
      disabled: isEdit && isEdit && readOnly,
    },
    {
      field: "lastName",
      isRequired: true,
      label: "Last name",
      description: "Enter student Last name",
      showError: showErrorEvenIfUntouched,
      disabled: isEdit && readOnly,
    },
    {
      field: "dateOfBirth",
      label: "Date Of Birth",
      isRequired: true,
      description: "Select Date Of Birth",
      showError: showErrorEvenIfUntouched,
      disabled: isEdit && readOnly,
    },
  ];

  const validator = (student: Student) => {
    return config
      .filter((c) => c.isRequired)
      .map((c) => (student[c.field as keyof Student]  ? {} : { [c.field]: "Required" }))
      .reduce(reduceObjectArrayToObject, {});
  };

  return (
    <Form<Student>
      onSubmit={hadleFormSubmit}
      initialValues={{ ...student }}
      validate={validator}
      mutators={{
        ...arrayMutators,
      }}
      render={({
        form,
        form: {
          mutators: { push, pop },
        },
        handleSubmit,
        pristine,
        hasValidationErrors,
        submitting,
        values,
      }) => (
        <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={close}>
          <DialogTitle id="max-width-dialog-title" >
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h6">{isEdit ? "Edit" : "Create"} Student</Typography>
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          </Grid>
          </DialogTitle>
          <DialogContent dividers>
            <form onSubmit={handleSubmit}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <CtextField {...{ ...config[0] }}></CtextField>
                  </Grid>
                  <Grid item xs={3}>
                    <CtextField {...{ ...config[1] }}></CtextField>
                  </Grid>
                  <Grid item xs={3}>
                      <CDateField {...{ ...config[2] }}></CDateField>
                  </Grid>
                  <Grid item xs={3}>
                    <CSelectField
                      {...{
                        field: "nationality.ID",
                        label: "Nationality",
                        description: "Select Nationality",
                        showError: showErrorEvenIfUntouched,
                        disabled: isEdit && readOnly,
                        options: nationalities.map((item) => ({
                          label: item.Title,
                          value: item.ID + "",
                        })) as IData[],
                      }}
                    ></CSelectField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => push("familyMembers", undefined)}
                      color="primary"
                      disabled={isEdit && readOnly}
                    >
                      Add Family Memeber
                    </Button>
                  </Grid>
                  <FieldArray name="familyMembers">
                    {({ fields }) =>
                      fields.map((name, index) => (
                        <>
                          <Grid item xs={2}>
                            <CtextField
                              label="Enter First Name"
                              field={`${name}.firstName`}
                              description={""}
                              disabled={isEdit && readOnly}
                            ></CtextField>
                          </Grid>
                          <Grid item xs={2}>
                            <CtextField
                              label="Enter Last Name"
                              field={`${name}.lastName`}
                              description={""}
                              disabled={isEdit && readOnly}
                            ></CtextField>
                          </Grid>
                          <Grid item xs={2}>
                            <CDateField
                              label="Select Date of Birth"
                              field={`${name}.dateOfBirth`}
                              description={""}
                              disabled={isEdit && readOnly}
                            ></CDateField>
                          </Grid>
                          <Grid item xs={2}>
                            <CSelectField
                              options={relationships}
                              label="Select relationship"
                              field={`${name}.relationship`}
                              description={""}
                              disabled={isEdit && readOnly}
                            ></CSelectField>
                          </Grid>
                          <Grid item xs={3}>
                            <CSelectField
                              options={nationalities.map((item) => ({
                                label: item.Title,
                                value: item.ID + "",
                              }))}
                              label="Select nationality"
                              field={`${name}.nationality.ID`}
                              description={""}
                              disabled={isEdit && readOnly}
                            ></CSelectField>
                          </Grid>
                          <Grid item xs={1}>
                            <CTooltip title={"Delete Member"}>
                              <Button
                                style={{ marginTop: "15px" }}
                                variant="outlined"
                                color={"secondary"}
                                size="small"
                                onClick={() => fields.remove(index)}
                                disabled={isEdit && readOnly}
                              >
                                <DeleteIcon />
                              </Button>
                            </CTooltip>
                          </Grid>
                        </>
                      ))
                    }
                  </FieldArray>
                </Grid>
              </MuiPickersUtilsProvider>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              variant="contained"
              onClick={() => form.reset()}
              disabled={submitting || pristine}
            >
              Reset
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={form.submit}
              color="primary"
              disabled={
                submitting || (isEdit && pristine) || hasValidationErrors
              }
            >
              {isEdit ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    ></Form>
  );
};
