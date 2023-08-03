import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { getUserApi } from "../api";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function Login() {
  const [selectedGroup, setSelectedGroup] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Check if any field is empty
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password || !selectedGroup) {
      // If any field is empty, show the error message and return
      toast.error("Please fill in all the required fields.");
      return;
    }

    try {
      const { data } = await getUserApi();
      if (data) {
        const user = data.filter(
          (el) =>
            el.email.toLowerCase() === email.toLowerCase() &&
            el.password === password &&
            el.grouptype.toLowerCase() === selectedGroup.toLowerCase()
        );
        if (user.length > 0) {          
          dispatch(setUser(user[0]));
          localStorage.setItem("userId", user[0].id);
          // Navigate to the main page
          toast.success("Login successful");
          setTimeout(() => {
            navigate("/main");
          }, 1000);
        } else {
          toast.error("Invalid credentials");
        }
      }
    } catch (error) {
      // Handle any errors here
      console.error("Error during login:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControl fullWidth sx={{ mt: 1 }}>
              <Select
                required
                value={selectedGroup}
                onChange={(event) => setSelectedGroup(event.target.value)}
                displayEmpty
                fullWidth
                inputProps={{ "aria-label": "Select group" }}
              >
                <MenuItem value="">Select group</MenuItem>
                <MenuItem value="group1">Group 1</MenuItem>
                <MenuItem value="group2">Group 2</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
