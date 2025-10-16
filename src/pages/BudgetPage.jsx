import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getTeams } from "../utils/api_teams";
import { useCookies } from "react-cookie";
import { getSponsors } from "../utils/api_sponsors";
import { getExpenses } from "../utils/api_expense";

const BudgetPage = () => {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [teams, setTeams] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [teamData, setTeamData] = useState([]);
  
  useEffect(() => {
    console.log("Fetching data...");
    Promise.all([getTeams(), getSponsors("all", token), getExpenses("all", token)]).then(([teamData, sponsorData, expenseData]) => {
      console.log("Teams:", teamData);
      console.log("Sponsors:", sponsorData);
      console.log("Expenses:", expenseData);
      
      setTeams(teamData);
      setSponsors(sponsorData);
      setExpenses(expenseData);
    });
  }, []);

  useEffect(() => {
    if (teams.length > 0 && sponsors.length > 0 && expenses.length > 0) {
      const combined = teams.map((team) => {
        const teamSponsors = sponsors.filter((sponsor) => sponsor.team._id === team._id);
        const teamExpenses = expenses.filter((expense) => expense.team._id === team._id);

        const totalSponsors = teamSponsors.reduce((sum, sponsor) => sum + Number(sponsor.amount), 0);
        const totalExpenses = teamExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

        return {
          ...team,
          sponsorAmount: totalSponsors,
          expenseAmount: totalExpenses
        };
      });
      setTeamData(combined.sort((a, b) => b.balance - a.balance));
    }
  }, [teams, sponsors, expenses]); 

  return (
    <>
      <Header current="budget"/>
      <Container sx={{p: 3}}>
        <Typography variant="h3" sx={{mb: 3}}>Budget Ranking</Typography>
        <TableContainer sx={{border: "1px solid black", borderRadius: 2, p: 2}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Teams</TableCell>
                <TableCell>Budget Cap</TableCell>
                <TableCell>Sponsors Amount</TableCell>
                <TableCell>Expenses Amount</TableCell>
                <TableCell align="right">Remaining Budget</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {teamData.map((team) => (
              <TableRow>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.budgetCap}</TableCell>
                <TableCell sx={{color: "green"}}>+ {team.sponsorAmount}</TableCell>
                <TableCell sx={{color: "red"}}>- {team.expenseAmount}</TableCell>
                <TableCell align="right">{team.balance}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default BudgetPage;