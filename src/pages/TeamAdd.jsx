import { Box, Button, Container, styled, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { CloudUpload } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { toast } from "sonner";
import { addTeam } from "../utils/api_teams";
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

const TeamAdd = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [name, setName] = useState("");
  const [principal, setPrincipal] = useState("");
  const [country, setCountry] = useState("");
  const [teamLogo, setTeamLogo] = useState(null);
  const [teamCar, setTeamCar] = useState(null);

  const handleFormSubmit = async (event) => {
    if (!name || !principal || !country || !teamLogo || !teamCar) {
      toast.error("Please fill up the required fields");
    }

    try {
      await addTeam(name, principal, country, teamLogo, teamCar, token);
      toast.success("New team has been added");
      navigate("/manage-teams");
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
    <Header/>
    <Container maxWidth="sm" sx={{p: 3}}>
      <Typography variant="h3" sx={{mb: 3}}>Add New Team</Typography>
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
        <Button variant="contained" color="primary" onClick={handleFormSubmit}>Add Team</Button>
      </Box>
    </Container>
    </>
  )
}

export default TeamAdd;