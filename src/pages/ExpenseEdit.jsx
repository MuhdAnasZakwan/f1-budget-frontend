import { Box, Button, Container, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import Header from "../components/Header"
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { getTeams } from "../utils/api_teams";
import { getExpense, updateExpense } from "../utils/api_expense";
import { toast } from "sonner";

const ExpenseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;
  
  const [error, setError] = useState(null);

  const [teams, setTeams] = useState([]);

  const [team, setTeam] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    getTeams().then((data) => setTeams(data));
  }, []);

  useEffect(() => {
    getExpense(id, token).then((expenseData) => {
      if (expenseData) {
        setTeam(expenseData ? expenseData.team : "");
        setType(expenseData ? expenseData.type : "");
        setDescription(expenseData ? expenseData.description : "");
        setAmount(expenseData ? expenseData.amount : 0)
      } else {
        setError("Expense not found");
      }
    }).catch((error) => {
      setError("Expense not found");
    });
  }, [id]);

  const handleFormSubmit = async (event) => {
    if (!team || !type || !amount) {
      toast.error("Please fill up all the required fields");
    }

    try {
      await updateExpense(id, team, type, description, amount, token);
      toast.success("Expense has been updated");
      navigate("/manage-expenses")
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Header/>
      <Container maxWidth="sm" sx={{p: 3}}>
        <Typography variant="h3" sx={{mb: 3}}>Edit Expense</Typography>
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
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>Edit Expense</Button>
        </Box>
      </Container>
    </>
  )
}

export default ExpenseEdit;