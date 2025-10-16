import { Box, Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Header = (props) => {
  const navigate = useNavigate();
  const {current} = props;
  const [cookie, setCookie, removeCookie] = useCookies(["currentuser"]);
  const {currentuser} = cookie;

  return (
    <Box fullWidth sx={{backgroundColor: "#15151e", p: 3, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <Box sx={{display: "flex", alignItems: "center", gap: 5}}>
        <Box component={Link} to="/"><Box component="img" src="/F1-75-Logo.png" sx={{ height: 20, cursor: "pointer" }}/></Box>
        <Button variant="text" sx={{color: "white", fontWeight: current === "drivers" ? "bold" : "normal"}} component={Link} to="/drivers">Drivers</Button>
        <Button variant="text" sx={{color: "white", fontWeight: current === "teams" ? "bold" : "normal"}} component={Link} to="/teams">Teams</Button>
        {currentuser ? (<Button variant="text" sx={{color: "white", fontWeight: current === "budget" ? "bold" : "normal"}} component={Link} to="/budget">Budget</Button>) : ("")}
        {currentuser && currentuser.role === "admin" ? (<Button variant="text" sx={{color: "white", fontWeight: current === "admin" ? "bold" : "normal"}} component={Link} to="/admin">Admin</Button>) : ("")}
      </Box>
      {currentuser ? (
        <Button variant="contained" sx={{backgroundColor: "black", textTransform: "none"}} onClick={() => {removeCookie("currentuser"); navigate("/"); toast.success("Successfully logged out");}}><b>Log out</b></Button>
      ) : (
        <Button variant="contained" sx={{backgroundColor: "black", textTransform: "none"}} component={Link} to="/signin"><b>Sign In</b></Button>
      )}
    </Box>
  )
};

export default Header;