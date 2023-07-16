import './App.css';
import { ptBR } from '@mui/material/locale';
import BankTransfersView from "./Components/BankTransfersView";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({}, ptBR);

function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <BankTransfersView/>
          </header>
        </div>
    </ThemeProvider>
  );
}

export default App;
