export interface Student {
  ID: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  nationality?: Nationality;
  familyMembers: FamilyMember[];
}

export interface Nationality {
  ID: number;
  Title: string;
}

export interface FamilyMember {
  ID: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  relationship: string;
  nationality: {
    ID: number;
    Title: string;
  };
}

export const DEFAULT_STUDENT: Student = {
  ID: 0,
  firstName: '',
  lastName: '',
  dateOfBirth: new Date(),
  nationality: {
    ID: 0,
    Title: ''
  },
  familyMembers: []
}
