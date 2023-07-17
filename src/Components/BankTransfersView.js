import "../css/BankTransferView.css"
import BankTransfersTable from "./BankTransfersTable";
import AutocompleteSelector from "./AutocompleteSelector"
import {useEffect, useState} from "react";
import {Button, Grid} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/pt-br'

const BASE_URL = "http://localhost:8080/transfers"
let default_filters = {startTime: null, endTime: null, operatorName: ''}

function formatData(data) {
    data.forEach((row) => {
        row.dataTransferencia = new Date(row.dataTransferencia).toLocaleDateString('pt-br');

        row.tipo = row.tipo.charAt(0) + row.tipo.slice(1).toLowerCase();
        if (row.tipo === "Transferencia") {
            row.tipo += (row.valor > 0) ? " Entrada" : " Entrada"
        }
    })
}

function constructAPIQuery(filters) {
    let query = BASE_URL + "?";
    if (filters.accountId) {
        query += `&accountId=${filters.accountId}`
    }
    if (filters.startTime instanceof Date) {
        query += `&startTime=${filters.startTime.toISOString()}`;
    }
    if (filters.endTime instanceof Date) {
        query += `&endTime=${filters.endTime.toISOString()}`;
    }
    if (filters.operatorName !== "") {
        query += `&operatorName=${filters.operatorName}`;
    }

    return query;
}

function BankTransfersView({selectedUserId}) {
    const [transfersData, setTransfersData] = useState();
    const [operators, setOperators] = useState();

    default_filters = {...default_filters, "accountId": selectedUserId}

    const [filters, setFilters] = useState(default_filters);
    const [oldFilters, setOldFilters] = useState();

    function updateFilters(key, newValue) {
        let newObj = {[key]: newValue};
        setFilters({...filters, ...newObj});
    }

    const fetchTableData = () => {
        if (filters !== oldFilters) {
            fetch(constructAPIQuery(filters)).then(response => {
                return response.json();
            }).then(data => {
                formatData(data);
                setTransfersData(data);
            });
            setOldFilters(filters)
        }
    }

    const fetchOperators = () => {
        fetch(`${BASE_URL}/operators`).then(response => {
            return response.json();
        }).then(data => {
            let dataObj = [];
            data.forEach((row) => {
                if (row !== null) dataObj.push({"label": row})
            })
            setOperators(dataObj);
        });
    }

    useEffect(() => {
        fetchOperators();
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
                <AutocompleteSelector
                    title="Nome do Operador Transacionado"
                    updateValue={(newValue) => (updateFilters("operatorName", newValue.label))}
                    textValue={filters.operatorName}
                    autoCompleteData={operators}/>
            </Grid>
            <Grid item xs={1} sm={2} md={2} className={"last-grid-cell"}>
                <Button className="buttons" variant="outlined" onClick={() => fetchTableData()}>Pesquisar</Button>
            </Grid>
            <Grid item xs={1} sm={2} md={2} className={"last-grid-cell"}>
                <Button className="buttons" variant="outlined" onClick={() => (setFilters(default_filters))}>Limpar Filtros</Button>
            </Grid>


            <Grid item xs={12} sm={12} md={12}>
                <BankTransfersTable tableData={transfersData}/>
            </Grid>
        </Grid>
    )
}

export default BankTransfersView;