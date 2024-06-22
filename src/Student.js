import { Autocomplete, Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Snackbar, TextField } from "@mui/material"
import React, { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const Student = () => {
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [studentDetail, setStudentDetail] = useState({ isFeePaid: false, isActive: false });
    const [studentId, setStudentId] = useState(null);


    const handlePopupClick = () => {
        setOpen(true);
    };

    const handlePopupClose = () => {
        setOpen(false);
    };

    const handleStudentDetails = (key, value) => {
        setStudentDetail({
            ...studentDetail,
            [key]: value
        })
    }


    
      const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
      };

    const handleAddStudentSubmission = () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentDetail)
        };

        fetch("http://localhost:8080/addStudent", options)
            .then(response => response.json())
            .then(data => {
                setStudentId(data.id)
                setSnackOpen(true)
            })
            .catch(err => console.log(err));

        setOpen(false);
    }

    const renderSnackbar = () => {

        return <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={handleSnackClose}
            message={`Student : ${studentId} Added Successfully !!!`}
        />
    }

    const renderForm = () => {
        return (
            <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            label="Name"
                            fullWidth
                            variant="outlined"
                            onChange={(event) => { handleStudentDetails("name", event.target.value) }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            options={["Java", "Python", "Asp.Net"]}
                            renderInput={(params) => <TextField {...params} label="Course" />}
                            onChange={(event, newValue) => { handleStudentDetails("course", newValue) }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            options={["3 Months", "6 Months", "12 Months"]}
                            renderInput={(params) => <TextField {...params} label="Duration" />}
                            onChange={(event, newValue) => { handleStudentDetails("duration", newValue) }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Fee Paid"
                            onChange={(event) => { handleStudentDetails("isFeePaid", event.target.checked) }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Active"
                            onChange={(event) => { handleStudentDetails("isActive", event.target.checked) }}
                        />
                    </Grid>
                </Grid>
            </Box>
        )
    }


    const renderAddStudentPopup = () => {
        return (
            <React.Fragment>
                <Dialog open={open} onClose={handlePopupClose} fullWidth={true} maxWidth="lg"  >
                    <DialogTitle>{"Add Student"}</DialogTitle>
                    <DialogContent>{renderForm()}</DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button variant="contained" color="error" onClick={handlePopupClose} size="large">Cancel</Button>
                        <Button variant="contained" size="large" onClick={() => { handleAddStudentSubmission() }}>Add Student</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }

    const renderAddStudent = () => {
        return (
            <Grid container spacing={2} direction="row-reverse">
                <Grid item xs={2}>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handlePopupClick}>Add Student</Button>
                </Grid>
            </Grid>

        )
    }



    return (
        <React.Fragment>
            {renderSnackbar()}
            {renderAddStudentPopup()}
            {renderAddStudent()}
        </React.Fragment>
    )
}