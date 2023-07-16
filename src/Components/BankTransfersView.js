import "../css/BankTransferView.css"
import BankTransfersTable from "./BankTransfersTable";
import OperatorSelector from "./OperatorSelector"
import {useEffect, useState} from "react";
import {Button, Grid} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/pt-br'

const BASE_URL = "http://localhost:8080/transfers?"
let DEFAULT_FILTERS = {startTime: null, endTime: null, operatorName: ''}

function formatData(data) {
    data.forEach((row) => {
        row.dataTransferencia = new Date(row.dataTransferencia).toLocaleDateString('pt-br');
        row.tipo = row.tipo.charAt(0) + row.tipo.slice(1).toLowerCase();
    })
}

function constructAPIQuery(filters) {
    let query = BASE_URL;
    if (filters.startTime instanceof Date) {
        query += `&startTime=${filters.startTime.toISOString()}`;
    }
    if (filters.endTime instanceof Date) {
        query += `&endTime=${filters.endTime.toISOString()}`;
    }
    if (filters.operatorName) {
        query += `&operatorName=${filters.operatorName}`;
    }

    return query;
}

function BankTransfersView() {
    const [transfersData, setTransfersData] = useState();

    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [oldFilters, setOldFilters] = useState();

    function updateFilters(key, newValue) {
        let newObj = {[key]: newValue};
        setFilters({...filters, ...newObj});
    }

    const fetchTableData = () => {
        if (filters !== oldFilters) {
            console.log("fetching");
            fetch(constructAPIQuery(filters)).then(response => {
                return response.json();
            }).then(data => {
                formatData(data);
                setTransfersData(data);
            });
            setOldFilters(filters)
        }
    }

    useEffect(() => {
        fetchTableData();
    }, [])

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="grid-container"
              justifyContent="flex-end" alignItems="flex-end">
            <Grid item xs={2} sm={4} md={4} className="first-grid-cell">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                    <DatePicker label={"Data de Início"}
                                value={filters.startTime}
                                onChange={(newValue) => (updateFilters("startTime", newValue.$d))}/>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                    <DatePicker label={"Data de Fim"}
                                value={filters.endTime}
                                onChange={(newValue) => (updateFilters("endTime", newValue.$d))}/>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={2} sm={4} md={4} className={"last-grid-cell"}>
                <OperatorSelector updateFilters={updateFilters} textValue={filters.operatorName}/>
            </Grid>
            <Grid item xs={2} sm={4} md={4} className={"last-grid-cell"}>
                <Button variant="outlined" onClick={() => fetchTableData()}>Pesquisar</Button>
                <Button variant="outlined" onClick={() => (setFilters(DEFAULT_FILTERS))}>Limpar Filtros</Button>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <BankTransfersTable tableData={transfersData}/>
            </Grid>
        </Grid>
    )
}

export default BankTransfersView;