import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Paper, Box, Grid, Typography, Button } from "@mui/material";

const Task = ({
  task,
  toggleTaskCompletion,
  deleteTask,
  index,
  tasks,
  setTasks,
  showSuccessMessage,
  setShowSuccessMessage,
  successMessage,
  setSuccessMessage,
}) => {
  const handleToggleTaskCompletion = (taskId) => {
    toggleTaskCompletion(taskId);
    setShowSuccessMessage(true);
    setSuccessMessage(
      `Task ${
        task.completed ? "completed successfully!" : "is still incomplete"
      }`
    );
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    setShowSuccessMessage(true);
    setSuccessMessage("Task deleted successfully!");
  };

  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "task",
    hover: (item) => {
      if (!item || item.index === index) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      const updatedTasks = [...tasks];
      [updatedTasks[dragIndex], updatedTasks[hoverIndex]] = [
        updatedTasks[hoverIndex],
        updatedTasks[dragIndex],
      ];

      setTasks(updatedTasks);
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <Box ref={(node) => drag(drop(node))} style={{ opacity }} mt={2}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="primary">
              {task.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1" color="textSecondary">
              {task.description}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color={task.completed ? "secondary" : "primary"}
              onClick={() => handleToggleTaskCompletion(task.id)}
              fullWidth
            >
              {task.completed ? "Incomplete" : "Complete"}
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteTask(task.id)}
              fullWidth
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Task;
