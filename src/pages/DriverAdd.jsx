import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, styled, TextField, Typography } from "@mui/material";
import Header from "../components/Header"
import { useEffect, useState } from "react";
import { getTeams } from "../utils/api_teams";
import { CloudUpload } from "@mui/icons-material";
import { uploadDriverImage } from "../utils/api_driverImage";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { addDriver } from "../utils/api_drivers";

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

const DriverAdd = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [teams, setTeams] = useState([]);

  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [age, setAge] = useState(0);
  const [team, setTeam] = useState("");
  const [salary, setSalary] = useState(0);
  const [driverImage, setDriverImage] = useState(null);

  useEffect(() => {
    getTeams().then((data) => setTeams(data));
  }, []);

  const handleFormSubmit = async (event) => {
    if (!name || !nationality || !age || !team || !salary || !driverImage) {
      toast.error("Please fill up all the required fields");
    }

    try {
      await addDriver(name, nationality, age, team, salary, driverImage, token);
      toast.success("New driver has been added");
      navigate("/manage-drivers");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <Header/>
      <Container maxWidth="sm" sx={{p: 3}}>
        <Typography variant="h3" sx={{mb: 3}}>Add New Driver</Typography>
        <hr/>
        <Box sx={{ my: 3 }}>
          <Typography variant="body1" sx={{ mb: 0.5 }}>Driver Name</Typography>
          <TextField label="Enter your driver name" fullWidth value={name} onChange={(e) => setName(e.target.value)}/>
        </Box>
        <Box sx={{display: "flex", gap: 3, mb: 3, justifyContent: "space-between"}}>
          <Box sx={{width: "100%"}}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>Nationality</Typography>
            <TextField label="Enter your nationality" fullWidth value={nationality} onChange={(e) => setNationality(e.target.value)}/>
          </Box>
          <Box sx={{width: "100%"}}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>Age</Typography>
            <TextField type="number" label="Enter your age" fullWidth value={age} onChange={(e) => setAge(e.target.value)}/>
          </Box>
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
            <Typography variant="body1" sx={{ mb: 0.5 }}>Salary</Typography>
            <TextField type="number" label="Enter your salary" fullWidth value={salary} onChange={(e) => setSalary(e.target.value)}/>
          </Box>
        </Box>
        {driverImage ? (
          <Box sx={{width: "50%"}}>
            <img src={API_URL + driverImage} width="50%"/>
            <Button color="error" variant="contained" size="small" onClick={() => setDriverImage(null)}>Remove Driver Image</Button>
          </Box>
        ) : (
          <Box sx={{width: "100%"}}>
            <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
              Upload Driver Image
              <VisuallyHiddenInput type="file" onChange={async (event) => {
                const data = await uploadDriverImage(event.target.files[0]); setDriverImage(data.image_url);
              }} accept="image/*"/>
            </Button>
          </Box>
        )}
        <Box sx={{mt: 3}}>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>Add Driver</Button>
        </Box>
      </Container>
    </>
  );
}

export default DriverAdd;