import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutocompleteSelector({updateValue, textValue, title, autoCompleteData}) {
    return (
        <div>
        {(autoCompleteData) ?
            <Autocomplete
                id="autcomplete-box"
                options={autoCompleteData}
                disablePortal
                value={textValue}
                onChange={(e, value) => {
                    if (value !== null) updateValue(value)}
                }
                renderInput={(params) =>
                    <TextField {...params}
                               label={title}
                    />}
            /> :
            <p>Loading</p>
        }
        </div>
    );
}