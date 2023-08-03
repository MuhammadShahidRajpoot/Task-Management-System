import React, { useState } from "react";
import { Button, Grid, TextField, Box } from "@mui/material";
import { Snackbar } from "@mui/material";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if either the title or description is empty
    if (title.trim() === "" || description.trim() === "") {
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    addTask(newTask);
    setTitle("");
    setDescription("");
    setShowSuccessMessage(true);
    setShowErrorMessage(false);
  };

  const handleSnackbarClose = () => {
    setShowSuccessMessage(false);
  };

  const handleSnackbarErrorClose = () => {
    setShowErrorMessage(false);
  };

  return (
    <Box mt={3}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Task
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={showSuccessMessage}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Task added successfully!"
        />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={showErrorMessage}
          autoHideDuration={3000}
          onClose={handleSnackbarErrorClose}
          message="Please fill in both Title and Description fields."
        />
      </form>
    </Box>
  );
};

export default TaskForm;
