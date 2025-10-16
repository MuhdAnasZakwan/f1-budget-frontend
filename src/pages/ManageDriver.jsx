import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Header from "../components/Header";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { deleteDriver, getDrivers } from "../utils/api_drivers";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const ManageDriver = () => {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [drivers, setDrivers] = useState([]);
  const [team, setTeam] = useState("all");

  useEffect(() => {
    getDrivers(team).then((data) => {
      setDrivers(data);
    })
  }, [team]);

  const handleDriverDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDriver(id, token);
          const updatedDrivers = await getDrivers(team);
          setDrivers(updatedDrivers);
          toast.success("Driver has been deleted");
        }
      });
    };
  
  return (
    <>
      <Header/>
      <Container sx={{p: 3}}>
        <Typography variant="h3" sx={{mb: 3}}>Manage Drivers</Typography>
        <TableContainer sx={{border: "1px solid black", borderRadius: 2, p: 2}}>
          <Box sx={{mb: 3, display: "flex", justifyContent: "end"}}>
            <Button variant="contained" component={Link} to="/manage-drivers/add">Add Driver</Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Driver</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Total Points</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                drivers.map((driver) => (
                  <TableRow key={driver._id}>
                    <TableCell>{driver.name}</TableCell>
                    <TableCell>{driver.team.name}</TableCell>
                    <TableCell>{driver.totalPoints} pts</TableCell>
                    <TableCell align="right" sx={{display: "flex", gap: 2}}>
                      <Button variant="contained" color="error" onClick={() => {handleDriverDelete(driver._id)}}>Delete</Button>
                      <Button variant="contained" component={Link} to={`/manage-drivers/${driver._id}/edit`}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
};

export default ManageDriver;
