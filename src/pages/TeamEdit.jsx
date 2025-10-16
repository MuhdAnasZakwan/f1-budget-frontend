import { Box, Button, Container, styled, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { CloudUpload } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addTeam, getTeam, updateTeam } from "../utils/api_teams";
import { uploadTeamLogo } from "../utils/api_teamLogo";
import { uploadTeamCar } from "../utils/api_teamCar";
import { API_URL } from "../utils/constants";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const TeamEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [principal, setPrincipal] = useState("");
  const [country, setCountry] = useState("");
  const [budgetCap, setBudgetCap] = useState(0);
  const [balance, setBalance] = useState(0);
  const [championships, setChampionships] = useState(0);
  const [teamLogo, setTeamLogo] = useState(null);
  const [teamCar, setTeamCar] = useState(null);

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
      } else {
        setError("Team not found");
      }
    }).catch((error) => {
      setError("Team not found");
    });
  }, [id]);

  const handleFormSubmit = async (event) => {
    if (!name || !principal || !country || !teamLogo || !teamCar || !championships) {
      toast.error("Please fill up the required fields");
    }

    try {
      await updateTeam(id, name, principal, country, budgetCap, balance, championships, teamLogo, teamCar, token);
      toast.success("Team has been updated");
      navigate("/manage-teams");
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (error) {
    return (
      <>
        <Header/>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <hr />
          <Typography variant="h3" align="center" mb={2} color="error">{error}</Typography>
          <Button variant="contained" color="primary" component={Link} to="/">Go back to home</Button>
        </Container>
      </>
    )
  }

  return (
    <>
    <Header/>
    <Container maxWidth="sm" sx={{p: 3}}>
      <Typography variant="h3" sx={{mb: 3}}>Edit Team</Typography>
      <hr/>
      <Box sx={{ my: 3 }}>
        <Typography variant="body1" sx={{ mb: 0.5 }}>Team Name</Typography>
        <TextField label="Enter your team name" fullWidth value={name} onChange={(e) => setName(e.target.value)}/>
      </Box>
      <Box sx={{display: "flex", gap: 3, mb: 3, justifyContent: "space-between"}}>
        <Box sx={{width: "100%"}}>
          <Typography variant="body1" sx={{ mb: 0.5 }}>Principal</Typography>
          <TextField label="Enter your principal name" fullWidth value={principal} onChange={(e) => setPrincipal(e.target.value)}/>
        </Box>
        <Box sx={{width: "100%"}}>
          <Typography variant="body1" sx={{ mb: 0.5 }}>Country</Typography>
          <TextField label="Enter your country" fullWidth value={country} onChange={(e) => setCountry(e.target.value)}/>
        </Box>
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="body1" sx={{ mb: 0.5 }}>Championships</Typography>
        <TextField label="Enter your championship wins" fullWidth value={championships} onChange={(e) => setChampionships(e.target.value)}/>
      </Box>
      <Box sx={{display: "flex", gap: 3, mb: 3, justifyContent: "space-between"}}>
          {teamLogo ? (
            <Box sx={{width: "100%"}}>
              <img src={API_URL + teamLogo} width="100%"/>
              <Button color="error" variant="contained" size="small" onClick={() => setTeamLogo(null)}>Remove Team Logo</Button>
            </Box>
          ) : (
            <Box sx={{width: "100%"}}>
              <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
                Upload Team Logo
                <VisuallyHiddenInput type="file" onChange={async (event) => {
                  const data = await uploadTeamLogo(event.target.files[0]); setTeamLogo(data.image_url);
                }} accept="image/*"/>
              </Button>
            </Box>
          )}
          {teamCar ? (
            <Box sx={{width: "100%"}}>
              <img src={API_URL + teamCar} width="100%"/>
              <Button color="error" variant="contained" size="small" onClick={() => setTeamCar(null)}>Remove Team Car</Button>
            </Box>
          ) : (
            <Box sx={{width: "100%"}}>
              <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
                Upload Team Car
                <VisuallyHiddenInput type="file" onChange={async (event) => {
                  const data = await uploadTeamCar(event.target.files[0]); setTeamCar(data.image_url);
                }} accept="image/*"/>
              </Button>
            </Box>
          )}
      </Box>
      <Box>
        <Button variant="contained" color="primary" onClick={handleFormSubmit}>Edit Team</Button>
      </Box>
    </Container>
    </>
  )
}

export default TeamEdit;