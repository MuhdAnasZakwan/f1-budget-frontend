import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Header from "../components/Header"
import { useEffect, useState } from "react";
import { getDrivers } from "../utils/api_drivers";
import { getTeams } from "../utils/api_teams";
import { API_URL } from "../utils/constants";
import { Link } from "react-router";

const DriverPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [team, setTeam] = useState("all");

  useEffect(() => {
    getDrivers(team).then((data) => {
      setDrivers(data);
    })
  }, [team]);

  useEffect(() => {
    getTeams().then((data) => setTeams(data));
  }, []);

  return (
    <>
    <Header current="drivers"/>
    <Container sx={{p: 3}}>
      <Typography variant="h3" sx={{mb: 3}}>Drivers</Typography>
      <FormControl sx={{mb: 3, minWidth: "200px"}}>
        <InputLabel id="team-label">Team</InputLabel>
        <Select labelId="team-label" value={team} onChange={(e) => setTeam(e.target.value)}>
          <MenuItem value="all">All</MenuItem>
          {teams.map((oneTeam) => (
            <MenuItem value={oneTeam._id}>{oneTeam.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {drivers.map((driver) => (
          <Grid key={driver._id} size={{sm: 12, md: 6, lg: 4}} component={Link} to={`/drivers/${driver._id}`} sx={{textDecoration: "none", color: "black"}}>
            <Box sx={{border: "1px solid black", borderRadius: 2, p: 2}}>
              <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Box>
                  <Typography variant="h5">{driver.name}</Typography>
                  <Typography variant="body1">{driver.team.name}</Typography>
                </Box>
                <Typography variant="h5">{driver.totalPoints} pts</Typography>
              </Box>
              <hr/>
              <img src={API_URL + driver.driverImage} width={"100%"}/>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  )
}

export default DriverPage;