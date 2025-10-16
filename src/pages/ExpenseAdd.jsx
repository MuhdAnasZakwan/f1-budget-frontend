import { Box, Button, Container, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import Header from "../components/Header"
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { getTeams } from "../utils/api_teams";
import { addExpense } from "../utils/api_expense";
import { toast } from "sonner";

const ExpenseAdd = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [teams, setTeams] = useState([]);

  const [team, setTeam] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    getTeams().then((data) => setTeams(data));
  }, []);

  const handleFormSubmit = async (event) => {
    if (!team || !type || !amount) {
      toast.error("Please fill up all the required fields");
    }

    try {
      await addExpense(team, type, description, amount, token);
      toast.success("New expense has been added");
      navigate("/manage-expenses")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }


  return (
    <>
      <Header/>
      <Container maxWidth="sm" sx={{p: 3}}>
        <Typography variant="h3" sx={{mb: 3}}>Add New Expense</Typography>
        <hr/>
        <Box sx={{ my: 3 }}>
          <Typography variant="body1" sx={{ mb: 0.5 }}>Expense</Typography>
          <TextField label="Enter your expense type" fullWidth value={type} onChange={(e) => setType(e.target.value)}/>
        </Box>
        <Box sx={{display: "flex", gap: 3, mb: 3, justifyContent: "space-between"}}>
          <FormControl sx={{width: "100%"}}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>Team</Typography>
            <Select id="teams" label="Teams" value={team} onChange={(e) => setTeam(e.target.value)}>
              {teams.map((oneTeam) => (
                <MenuItem value={oneTeam._id}>{oneTeam.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{width: "100%"}}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>Amount</Typography>
            <TextField type="number" label="Enter the amount" fullWidth value={amount} onChange={(e) => setAmount(e.target.value)}/>
          </Box>
        </Box>
        <Box sx={{ my: 3 }}>
          <Typography variant="body1" sx={{ mb: 0.5 }}>Description</Typography>
          <TextField label="Enter the description" multiline rows={3} fullWidth value={description} onChange={(e) => setDescription(e.target.value)}/>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>Add Expense</Button>
        </Box>
      </Container>
    </>
  )
}

export default ExpenseAdd;