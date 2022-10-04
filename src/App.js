import { createTheme,ThemeProvider } from '@mui/material/styles';  
import MainPage from './pages/main';
function App() {

const theme = createTheme({
  palette: {
    primary: {
      main: '#fafafa',
    },
    secondary: {
      main: '#f44336',
    },
  },
});
  return (
    <ThemeProvider theme ={theme}>
    <div>
      <MainPage/>
    </div>
    </ThemeProvider>
  );
}
export default App;
