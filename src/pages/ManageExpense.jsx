import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Header from "../components/Header";
import { Link } from "react-router";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { deleteExpense, getExpenses } from "../utils/api_expense";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { getTeams } from "../utils/api_teams";

const ManageExpense = () => {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [expenses, setExpenses] = useState([]);
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("all");

  useEffect(() => {
    getTeams().then((data) => setTeams(data));
  }, []);

  useEffect(() => {
    getExpenses(team, token).then((data) => {
      setExpenses(data);
    })
  }, [team]);

  const handleExpenseDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteExpense(id, token);
          const updatedSponsors = await getExpenses(team, token);
          setExpenses(updatedSponsors);
          toast.success("Sponsor has been deleted");
        }
      });
    };

  return (
    <>
      <Header/>
      <Container sx={{p: 3}}>
        <Typography variant="h3" sx={{mb: 3}}>Manage Expenses</Typography>
        <TableContainer sx={{border: "1px solid black", borderRadius: 2, p: 2}}>
          <Box sx={{mb: 3, display: "flex", justifyContent: "space-between"}}>
            <FormControl sx={{mb: 3, minWidth: "200px"}}>
              <InputLabel id="team-label">Team</InputLabel>
              <Select labelId="team-label" value={team} onChange={(e) => setTeam(e.target.value)}>
                <MenuItem value="all">All</MenuItem>
                {teams.map((oneTeam) => (
                  <MenuItem value={oneTeam._id}>{oneTeam.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" component={Link} to="/manage-expenses/add">Add Expense</Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow>
                  <TableCell>{expense.team.name}</TableCell>
                  <TableCell>{expense.type}</TableCell>
                  <TableCell>$ {expense.amount}</TableCell>
                  <TableCell align="right" sx={{display: "flex", gap: 2}}>
                    <Button variant="contained" color="error" onClick={() => {handleExpenseDelete(expense._id)}}>Delete</Button>
                    <Button variant="contained" component={Link} to={`/manage-expenses/${expense._id}/edit`}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default ManageExpense;