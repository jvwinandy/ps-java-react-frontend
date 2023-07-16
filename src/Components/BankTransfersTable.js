import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../css/BankTranfersTable.css"
import {useState} from "react";
import {TableFooter, TablePagination} from "@mui/material";

const ROWS_PER_PAGE = 4

export default function BankTransfersTable({tableData}) {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table" className="bank-transfers-table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Data da transferência</TableCell>
                        <TableCell align="left">Valor</TableCell>
                        <TableCell align="left">Tipo</TableCell>
                        <TableCell align="left">Nome do Operador Transacionado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData != null ? tableData.slice(ROWS_PER_PAGE*currentPage, ROWS_PER_PAGE*currentPage + ROWS_PER_PAGE).map((row) => (
                        <TableRow>
                            <TableCell align="left">{row.dataTransferencia}</TableCell>
                            <TableCell align="left">{row.valor.toFixed(2)}</TableCell>
                            <TableCell align="left">{row.tipo}</TableCell>
                            <TableCell align="left">{row.nomeOperadorTransacao}</TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={tableData ? tableData.length : -1}
                            page={currentPage}
                            rowsPerPage={ROWS_PER_PAGE}
                            onPageChange={(e, pageNumber) => (setCurrentPage(pageNumber))}
                            showFirstButton
                            showLastButton
                            rowsPerPageOptions={[]}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}