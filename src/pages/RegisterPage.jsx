import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SigninHeader from "../components/SigninHeader"
import { Link, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { toast } from "sonner";
import validator from "email-validator"
import { signup } from "../utils/api_users";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = async (event) => {
    try {
      if (!name || !email || !password || !confirmPassword) {
        toast.error("Please fill up all the fields");
      } else if (!validator.validate(email)) {
        toast.error("Please enter a valid email");
      } else if (password !== confirmPassword) {
        toast.error("Password does not match");
      } else {
        const userData = await signup(name, email, password);
        setCookie("currentuser", userData, {
          maxAge: 60 * 60 * 8
        });
        toast.success("New user have been created");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  return (
    <>
    <SigninHeader current="register"/>
    <Container maxWidth="sm" sx={{p: 3}}>
      <Typography variant="h3" sx={{mb: 3}}>Register</Typography>
      <hr/>
      <Box sx={{ my: 3 }}>
        <Typography variant="body1" sx={{ mb: 0.5 }}>Name</Typography>
        <TextField label="Enter your name" fullWidth value={name} onChange={(e) => setName(e.target.value)}/>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 0.5 }}>Email Address</Typography>
        <TextField label="Enter your email address" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 0.5 }}>Password</Typography>
        <TextField label="Enter your password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 0.5 }}>Confirm Password</Typography>
        <TextField label="Confirm your password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
      </Box>
      <Box sx={{mb: 3}}>
        <Button variant="contained" color="error" onClick={handleFormSubmit}>Register</Button>
      </Box>
    </Container>
    </>
  )
}

export default RegisterPage;