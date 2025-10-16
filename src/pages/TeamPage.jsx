import Header from "../components/Header";
import { Container, Grid, Typography, Box } from "@mui/material";
import { getTeams } from "../utils/api_teams";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import { Link } from "react-router";

const TeamPage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams().then((data) => {
      setTeams(data);
    });
  }, []);

  const sortedByPoints = [...teams].sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <>
    <Header current="teams"/>
    <Container sx={{p: 3}}>
      <Typography variant="h3" sx={{mb: 3}}>Teams</Typography>
      <Grid container spacing={2}>
        {sortedByPoints.map((team) => (
          <Grid size={{sm: 12, md: 6}} key={team._id}  component={Link} to={`/teams/${team._id}`} sx={{textDecoration: "none", color: "black"}}>
            <Box sx={{border: "1px solid black", borderRadius: 2, p: 2,}}>
              <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                  <img src={API_URL + team.teamLogo} height={"30px"}/>
                  <Typography variant="h5">{team.name}</Typography>
                </Box>
                <Typography variant="h5">{team.totalPoints} pts</Typography>
              </Box>
              <hr/>
              <img src={API_URL + team.teamCar} width={"100%"}/>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  )
}

export default TeamPage;