import { useNavigate, useParams } from "react-router";
import Header from "../components/Header"
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { uploadDriverImage } from "../utils/api_driverImage";
import { getDriver, updateDriver } from "../utils/api_drivers";
import { toast } from "sonner";
import { Box, Button, Container, FormControl, MenuItem, Select, styled, TextField, Typography } from "@mui/material";
import { getTeams } from "../utils/api_teams";
import { CloudUpload } from "@mui/icons-material";
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

const DriverEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [error, setError] = useState(null);

  const [teams, setTeams] = useState([]);

  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [age, setAge] = useState(0);
  const [team, setTeam] = useState("");
  const [salary, setSalary] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [driverImage, setDriverImage] = useState(null);

  useEffect(() => {
    getTeams().then((data) => setTeams(data));
  }, []);

  useEffect(() => {
    getDriver(id).then((driverData) => {
      if (driverData) {
        setName(driverData ? driverData.name : "");
        setNationality(driverData ? driverData.nationality : "");
        setAge(driverData ? driverData.age : 0);
        setTeam(driverData ? driverData.team._id : "");
        setSalary(driverData ? driverData.salary : 0);
        setTotalPoints(driverData ? driverData.totalPoints : 0);
        setDriverImage(driverData ? driverData.driverImage : null)
      } else {
        setError("Driver not found");
      }
    }).catch((error) => {
      setError("Driver not found");
    });
  }, [id]);

  const handleFormSubmit = async (event) => {
    if (!name || !nationality || !age || !team || !salary || !totalPoints || !driverImage) {
      toast.error("Please fill up the required fields");
    }

    try {
      await updateDriver(id, name, nationality, age, team, salary, totalPoints, driverImage, token);
      toast.success("Driver has been updated");
      navigate("/manage-drivers");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Header/>
      <Container maxWidth="sm" sx={{p: 3}}>
        <Typography variant="h3" sx={{mb: 3}}>Edit Driver</Typography>
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
        <Box sx={{ my: 3 }}>
          <Typography variant="body1" sx={{ mb: 0.5 }}>Total Points</Typography>
          <TextField type="number" label="Enter driver's total points" fullWidth value={totalPoints} onChange={(e) => setTotalPoints(e.target.value)}/>
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
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>Edit Driver</Button>
        </Box>
      </Container>
    </>
  )
}

export default DriverEdit;