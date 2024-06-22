import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { Student } from "./Student"
import { AllStudents } from "./AllStudents"

export const StudentManagementSystem = () => {
    return (
        <React.Fragment>
            <Box sx={{ height: 60, background: "#e2100f", position: "fixed", width: "100%", zIndex: 100 }}>
                <Typography variant="h4" sx={{ color: "white", p: 1, fontWeight: "bold" }}> KENPRO TECHNOLOGY</Typography>
            </Box>
            <Box sx={{ paddingTop: 10 }}>
                <Student />
            </Box>

            <AllStudents />

        </React.Fragment>
    )
}