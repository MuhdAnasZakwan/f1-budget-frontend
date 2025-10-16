import { Box, Container, Typography } from "@mui/material";
import Header from "../components/Header"
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getTeam } from "../utils/api_teams";
import { API_URL } from "../utils/constants";

const TeamSpecific = () => {
  const { id } = useParams();

  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [principal, setPrincipal] = useState("");
  const [country, setCountry] = useState("");
  const [budgetCap, setBudgetCap] = useState(0);
  const [balance, setBalance] = useState(0);
  const [championships, setChampionships] = useState(0);
  const [teamLogo, setTeamLogo] = useState(null);
  const [teamCar, setTeamCar] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    getTeam(id).then((teamData) => {
      if (teamData) {
        setName(teamData ? teamData.name : "");
        setPrincipal(teamData ? teamData.principal : "");
        setCountry(teamData ? teamData.country : "");
        setBudgetCap(teamData ? teamData.budgetCap: 0);
        setBalance(teamData ? teamData.balance : 0);
        setChampionships(teamData ? teamData.championships : 0);
        setTeamLogo(teamData ? teamData.teamLogo : null);
        setTeamCar(teamData ? teamData.teamCar : null);
        setTotalPoints(teamData ? teamData.totalPoints : 0);
      } else {
        setError("Team not found");
      }
    }).catch((error) => {
      setError("Team not found");
    });
  }, [id]);

  return (
    <>
      <Header/>
      <Container sx={{p: 3}}>
        <Box sx={{display: "flex", alignItems: "center", gap: 2, mb: 3}}>
          <img src={API_URL + teamLogo} height={"60px"}/>
          <Typography variant="h3">{name}</Typography>
          <hr/>
          <Typography variant="h3">{totalPoints} pts</Typography>
        </Box>
        <hr/>
        <Typography variant="body1" sx={{my: 3}}>Team Principal: {principal}</Typography>
        <Typography variant="body1" sx={{my: 3}}>Country of origin: {country}</Typography>
        <Typography variant="body1" sx={{my: 3}}>Grand Prix Won: {championships}</Typography>
        <img src={API_URL + teamCar}/>
      </Container>
    </>
  );
}

export default TeamSpecific;