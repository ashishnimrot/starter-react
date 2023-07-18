type TIconAction = {
  icon: React.ReactElement | ((item: Student) => React.ReactElement);
  action: (item: Student, callback?: () => void) => void;
  toolTip: string | ((item: Student) => string);
};

