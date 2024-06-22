import { Box, Button, Stack } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react"

export const AllStudents = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const options = {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }

        fetch("http://localhost:8080/getAllStudents", options)
            .then(response => response.json())
            .then(data => setRows(data))
            .catch(err => console.log(err))

    }, [])

    const columns = [
        { field: 'name', headerName: 'Student Name', width: 250 },
        { field: 'course', headerName: 'Course', width: 250 },
        { field: 'duration', headerName: 'Duration', width: 250 },
        { field: 'isActive', headerName: 'Status', width: 250 },
        { field: 'isFeePaid', headerName: 'Fee Paid', width: 250 }
    ];


    return (
        <React.Fragment>
            <Box sx={{ height: 500, width: '95%', p: 5 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                />
            </Box>
        </React.Fragment>

    )
}