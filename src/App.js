import './App.css';
import { ptBR } from '@mui/material/locale';
import BankTransfersView from "./Components/BankTransfersView";
import {createTheme, ThemeProvider} from "@mui/material";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {useState} from "react";
import UserSelectionView from "./Components/UserSelectionView";

const theme = createTheme({}, ptBR);

function App() {
    const [selectedUserId, setSelectedUserId] = useState()

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div className="App">
                    <header className="App-header">
                        <Routes>
                            <Route exact path="/" element={<UserSelectionView setSelectedUserId={setSelectedUserId}/>}/>
                            <Route exact path="/transfers" element={<BankTransfersView selectedUserId={selectedUserId}/>}/>
                        </Routes>
                    </header>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
