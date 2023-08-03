import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Typography, Container, Box } from "@mui/material";
import { getTasksListAPI } from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MainPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getTasksListAPI();
      if (res?.data && user) {
        const groupTasks = res.data?.filter(
          (el) => el.grouptype === user?.grouptype
        );
        setTasks(groupTasks);
      }
    })();
  }, [user]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("userId");

    // Navigate to the login page
    navigate("/");
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          style={{ backgroundColor: "red", color: "white" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>
      <DndProvider backend={HTML5Backend}>
        <Container>
          <Box mt={3}>
            <Typography variant="h4" align="center" gutterBottom>
              Task Management System
            </Typography>
            <TaskForm addTask={addTask} />
            <TaskList
              tasks={tasks}
              setTasks={setTasks}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          </Box>
        </Container>
      </DndProvider>
    </>
  );
};

export default MainPage;
