import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDriver } from "../utils/api_drivers";
import Header from "../components/Header";
import { Box, Container, Typography } from "@mui/material";
import { API_URL } from "../utils/constants";

const DriverSpecific = () => {
  const { id } = useParams();

  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [age, setAge] = useState(0);
  const [team, setTeam] = useState("");
  const [salary, setSalary] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [driverImage, setDriverImage] = useState(null);

  useEffect(() => {
    getDriver(id).then((driverData) => {
      if (driverData) {
        setName(driverData ? driverData.name : "");
        setNationality(driverData ? driverData.nationality : "");
        setAge(driverData ? driverData.age : 0);
        setTeam(driverData ? driverData.team : "");
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

  return (
      <>
        <Header/>
        <Container sx={{p: 3}}>
          <Box sx={{display: "flex", alignItems: "center", gap: 2, mb: 3}}>
            <Box>
              <Typography variant="h3">{name}</Typography>
              <Typography variant="body1">{team.name}</Typography>
            </Box>
            <hr/>
            <Typography variant="h3">{totalPoints} pts</Typography>
          </Box>
          <hr/>
          <Box sx={{display: "flex", gap: 2, my: 3}}>
            <img src={API_URL + driverImage} style={{border: "1px solid black", borderRadius: 2, p: 2}} width={"25%"}/>
            <Box>
              <Typography variant="body1" sx={{my: 3}}>Nationality: {nationality}</Typography>
              <Typography variant="body1" sx={{my: 3}}>Age: {age}</Typography>
              <Typography variant="body1" sx={{my: 3}}>Salary: {salary}</Typography>
            </Box>
          </Box>
        </Container>
      </>
    );
}

export default DriverSpecific;