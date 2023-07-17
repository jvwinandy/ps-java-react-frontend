import * as React from 'react';
import {Button, Stack} from "@mui/material";
import AutocompleteSelector from "./AutocompleteSelector";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function UserSelectionView({setSelectedUserId}) {
    const [users, setUsers] = useState();
    const [selectedUser, setSelectedUser] = useState();

    function formatData(data) {
        data.forEach((row) => {
            row.label = row.nomeResponsavel;
        })
    }

    const fetchUsers = () => {
        fetch("http://localhost:8080/accounts").then(response => {
            return response.json();
        }).then(data => {
            formatData(data)
            setUsers(data);
        });
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const navigate = useNavigate();
    function handleLogin() {
        if (users instanceof Array && users.includes(selectedUser)) {
            setSelectedUserId(selectedUser.idConta)
            navigate("/transfers");
        }
    }

    return (
        <Stack spacing={5} sx={{maxWidth:600, margin:"auto"}}>
            <h2>Selecione um Usuário</h2>
            <AutocompleteSelector title="Nome de Usuário"
                                  updateValue={setSelectedUser}
                                  textValue={selectedUser}
                                  autoCompleteData={users}
            >
            </AutocompleteSelector>
            <Button variant="outlined" onClick={handleLogin}>Entrar</Button>
        </Stack>
    );
}