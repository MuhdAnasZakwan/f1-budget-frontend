import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SigninHeader from "../components/SigninHeader"
import { Link, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { toast } from "sonner";
import { login } from "../utils/api_users";

const SigninPage = () => {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    try {
      if (!email || !password) {
        toast.error("Please fill up all the fields");
      } else {
        const userData = await login(email, password);
        setCookie("currentuser", userData, {
          maxAge: 60 * 60 * 8
        });
        toast.success("Successfully logged in");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
    <SigninHeader current="signin"/>
    <Container maxWidth="sm" sx={{p: 3}}>
      <Typography variant="h3" sx={{mb: 3}}>Sign in</Typography>
      <hr/>
      <Box sx={{ my: 3 }}>
        <Typography variant="body1" sx={{ mb: 0.5 }}>Email Address</Typography>
        <TextField label="Enter your email address" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 0.5 }}>Password</Typography>
        <TextField label="Enter your password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Box>
      <Box sx={{mb: 3}}>
        <Button variant="contained" color="error" onClick={handleFormSubmit}>Sign In</Button>
      </Box>
      <Box sx={{display: "flex", gap: 1}}>
        <Typography variant="body1">Don't have an account yet?</Typography>
      <Typography variant="body1" component={Link} to="/register" sx={{textDecoration: "underline red", color: "black"}}>Register Here</Typography>
      </Box>
    </Container>
    </>
  )
}

export default SigninPage;