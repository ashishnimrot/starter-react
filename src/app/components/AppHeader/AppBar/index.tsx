import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { default as ABar } from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { UserRole } from "../../../models/AppUser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    selectRoot: {
      color: "white",
    },
  })
);

export default function AppBar(props: {
  role: UserRole;
  setRole: (role: UserRole) => void;
}) {
  const classes = useStyles();
  const { role, setRole } = props;

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as "Admin" | "Registar");
  };

  return (
    <div className={classes.root}>
      <ABar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Student Management
          </Typography>
          {/* <Button color="inherit">{role}</Button> */}
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              id="select-role"
              value={role}
              onChange={handleRoleChange}
              classes={{ root: classes.selectRoot }}
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Registar"}>Registar</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </ABar>
    </div>
  );
}
