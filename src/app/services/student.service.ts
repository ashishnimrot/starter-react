import { FamilyMember, Nationality, Student } from "../models";
import { ObjectUtils } from "../utils/template";
import { requests } from "./api.service";
import { NotificationService } from "./notifications.service";

export namespace StudentService {
  /**
   * Update student
   * @param student
   * @param _student
   */
  const updatedStudent = async (student: Student, _student: Student) => {
    const { updated } = ObjectUtils.diff(student, _student, true);
    const { firstName, lastName, dateOfBirth, ID, nationality } = _student;
    let isStudentUpdate = false;
    for (let key in updated) {
      switch (key) {
        case "familyMembers":
          familyMemberOperation(student, _student, updated[key] as any);
          break;
        case "firstName":
        case "lastName":
        case "dateOfBirth":
          isStudentUpdate = true;
          break;
        case "nationality":
          nationality && (await updateNationality(nationality, ID));
          break;
      }
    }

    if (isStudentUpdate) {
      (await requests.put(`/api/Students/${ID}`, {
        firstName,
        lastName,
        dateOfBirth,
      })) as Student;
    }
  };

  const familyMemberOperation = async (
    student: Student,
    _student: Student,
    {
      added,
      removed,
      unchanged,
      updated,
      newValue,
    }: { added: any; removed: any; unchanged: any; updated: any; newValue: any }
  ) => {
    if (removed) {
      const deletes = Object.keys(removed).map((key) =>
        requests.delete(`/api/FamilyMembers/${student.familyMembers[+key].ID}`)
      );
      deletes.length > 0 && (await Promise.all(deletes));
    }
    if (updated) {
      const updates = Object.keys(updated)
        .map((key) => {
          let isUpdate = false;
          const {
            firstName,
            lastName,
            dateOfBirth,
            relationship,
            ID,
            nationality,
          } = _student.familyMembers[+key];

          Object.keys(updated[+key]["updated"]).forEach((key) => {
            switch (key) {
              case "firstName":
              case "lastName":
              case "dateOfBirth":
              case "relationship":
                isUpdate = true;
                break;
              case "nationality":
                nationality && updateNationality(nationality, ID, "Family");
                break;
            }
          });

          return isUpdate
            ? requests.put(`api/FamilyMembers/${ID}/`, {
                firstName,
                lastName,
                dateOfBirth,
                relationship,
              })
            : false;
        })
        .filter((c) => c);

      updates.length > 0 && (await Promise.all(updates));
    }
    const adds = { ...added, ...newValue };
    Object.keys(adds).forEach(async (key) => {
      const {
        firstName,
        lastName,
        dateOfBirth,
        relationship,
        ID,
        nationality,
      } = adds[+key] as FamilyMember;

      const addedFamily = await requests.post(
        `api/Students/${student.ID}/FamilyMembers/`,
        {
          firstName,
          lastName,
          dateOfBirth,
          relationship,
        }
      );
      nationality && updateNationality(nationality, addedFamily.ID, "Family");
    });
  };

  /**
   * Add/Update student details
   * @param student
   * @param _student
   */
  export const saveStudent = async (student: Student, _student: Student) => {
    try {
      const {
        ID,
        firstName,
        lastName,
        dateOfBirth,
        nationality,
        familyMembers,
      } = _student;
      const isEdit = ID === 0 ? false : true;
      if (isEdit) {
        updatedStudent(student, _student);
      } else {
        // Add Student
        const student = (await requests.post("api/Students", {
          firstName,
          lastName,
          dateOfBirth,
        })) as Student;

        // update student nationality
        nationality && (await updateNationality(nationality, student.ID));

        // Add Family members
        const promises = familyMembers.map(
          ({ firstName, lastName, dateOfBirth, relationship }) =>
            requests.post(`api/Students/${student.ID}/FamilyMembers/`, {
              firstName,
              lastName,
              dateOfBirth,
              relationship,
            })
        );
        const members = (await Promise.all(promises)) as FamilyMember[];

        // Update Family natinality
        members.forEach(async (member, idx) => {
          const { nationality } = familyMembers[idx];
          // update student nationality
          nationality &&
            (await updateNationality(nationality, member.ID, "Family"));
        });
      }
    } catch (e) {
      NotificationService.showError("Something went wrong!");
    }
  };

  /**
   * Get all stuent and natianality
   * @returns
   */
  export const getAllDetails = async () => {
    try {
      const nationalities = (await requests.get(
        "api/Nationalities"
      )) as Nationality[];
      const students = (await requests.get("api/Students")) as Student[];
      return {
        students,
        nationalities,
      };
    } catch (e) {
      NotificationService.showError("Something went wrong!");
    }
    return { students: [] as Student[], nationalities: [] as Nationality[] };
  };

  /**
   * Get select student details
   * @param student
   * @returns
   */
  export const getStudentDetails = async (student: Student) => {
    try {
      const familyMembers = (await requests.get(
        `/api/Students/${student.ID}/FamilyMembers/`
      )) as FamilyMember[];
      const studentNatinality = (await requests.get(
        `/api/Students/${student.ID}/Nationality/`
      )) as Nationality;

      return { ...student, ...studentNatinality, familyMembers };
    } catch (e) {
      NotificationService.showError("Something went wrong!");
    }
    return {} as Student;
  };

  /**
   * Update natinality details
   * @param nationality
   * @param ID
   * @param type
   */
  export const updateNationality = async (
    nationality: Nationality,
    ID: number,
    type: "Student" | "Family" = "Student"
  ) => {
    try {
      switch (type) {
        case "Student":
          await requests.put(
            `/api/Students/${ID}/Nationality/${nationality.ID}`,
            {}
          );
          break;
        case "Family":
          await requests.put(
            `/api/FamilyMembers/${ID}/Nationality/${nationality.ID}`,
            {}
          );
          break;
        default:
          break;
      }
    } catch (e) {
      NotificationService.showError("Something went wrong!");
    }
  };
}
