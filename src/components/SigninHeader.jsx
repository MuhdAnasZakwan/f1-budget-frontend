import { Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router";

const SigninHeader = (props) => {
  const navigate = useNavigate();
  const {current} = props;

  return (
    <Box fullWidth sx={{backgroundColor: "#38383f", p: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 5, position: "relative"}}>
      <Box component={Link} to="/" sx={{position: "absolute", left: 20, display: "flex", alignItems: "center"}}><Box component="img" src="/F1-75-Logo.png" sx={{ height: 20, cursor: "pointer" }}/></Box>
      <Box sx={{display: "flex", gap: 2}}>
        <Button variant="text" sx={{color: "white", fontWeight: current === "signin" ? "bold" : "normal", borderBottom: current === "signin" ? "red solid 5px" : ""}} component={Link} to="/signin">Sign In</Button>
        <Button variant="text" sx={{color: "white", fontWeight: current === "register" ? "bold" : "normal", borderBottom: current === "register" ? "red solid 5px" : ""}} component={Link} to="/register">Register</Button>
      </Box>
    </Box>
  )
};

export default SigninHeader;