import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import AppHeader from "./components/AppHeader";
import { Route, Router } from "react-router-dom";
import { history } from "./routes/history";
import { Home } from "./containers/Home";
import theme from "./components/ui/Theme";
import { makeStyles } from "@material-ui/core/styles";
import { AppNotification } from "./containers/Notificatins/NotifcationList";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppHeader></AppHeader>
        <AppNotification></AppNotification>
        <div className={classes.toolbarMargin} />
        <Home></Home>
        {/* <AppNotifications /> */}
        <Route />
      </ThemeProvider>
    </Router>
  );
}

export default App;
