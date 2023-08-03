import React, { useState, useEffect } from "react";
import { Box, Collapse, Typography } from "@mui/material";
import { Snackbar } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import Task from "./Task";

const TaskList = ({ tasks, setTasks, toggleTaskCompletion, deleteTask }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSnackbarClose = () => {
    setShowSuccessMessage(false);
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  return (
    <Box mt={3}>
      <TransitionGroup>
        {tasks.map((task, index) => (
          <CSSTransition key={task.id} timeout={500} classNames="task">
            <Task
              task={task}
              index={index}
              tasks={tasks}
              setTasks={setTasks}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
              showSuccessMessage={showSuccessMessage}
              setShowSuccessMessage={setShowSuccessMessage}
              successMessage={successMessage}
              setSuccessMessage={setSuccessMessage}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={successMessage}
      />
    </Box>
  );
};

export default TaskList;
