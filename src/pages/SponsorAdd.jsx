import { Box, Button, Container, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getTeams } from "../utils/api_teams";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { addSponsor } from "../utils/api_sponsors";

const SponsorAdd = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [teams, setTeams] = useState([]);

  const [sponsorName, setSponsorName] = useState("");
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState("");
  const [team, setTeam] = useState("");

  useEffect(() => {
    getTeams().then((data) => setTeams(data));
  }, []);

  const handleFormSubmit = async (event) => {
    if (!sponsorName || !amount || !duration || !team) {
      toast.error("Please fill up all the required fields");
    }

    try {
      await addSponsor(sponsorName, amount, duration, team, token);
      toast.success("New sponsor has been added");
      navigate("/manage-sponsors")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <Header/>
      <Container maxWidth="sm" sx={{p: 3}}>
        <Typography variant="h3" sx={{mb: 3}}>Add New Sponsor</Typography>
        <hr/>
        <Box sx={{ my: 3 }}>
          <Typography variant="body1" sx={{ mb: 0.5 }}>Sponsor Name</Typography>
          <TextField label="Enter your sponsor name" fullWidth value={sponsorName} onChange={(e) => setSponsorName(e.target.value)}/>
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
          <Typography variant="body1" sx={{ mb: 0.5 }}>Duration</Typography>
          <TextField label="Enter the duration" fullWidth value={duration} onChange={(e) => setDuration(e.target.value)}/>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>Add Sponsor</Button>
        </Box>
      </Container>
    </>
  )
}

export default SponsorAdd;