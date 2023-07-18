import { createTheme } from "@material-ui/core/styles";

const COLOR_BLUE = '#000080';
const COLOR_ORANGE = '#FFA500';
const COLOR_RED = '#d32f2f';
export default createTheme({
    palette: {
      primary: {
        main: `${COLOR_BLUE}`
      },
      secondary: {
        main: `${COLOR_RED}`
      }
    }
})