import { createTheme,ThemeProvider } from '@mui/material/styles'; 
import { ToastContainer } from 'react-toastify'; 
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
      <ToastContainer/>
      <MainPage/>
    </div>
    </ThemeProvider>
  );
}
export default App;
