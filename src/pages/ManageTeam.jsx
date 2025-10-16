import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Header from "../components/Header";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { deleteTeam, getTeams } from "../utils/api_teams";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const ManageTeam = () => {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams().then((data) => {
      setTeams(data);
    });
  }, [])

  const handleTeamDelete = async (id) => {
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
        await deleteTeam(id, token);
        const updatedTeams = await getTeams();
        setTeams(updatedTeams);
        toast.success("Team has been deleted");
      }
    });
  };

  return (
    <>
      <Header/>
      <Container sx={{p: 3}}>
        <Typography variant="h3" sx={{mb: 3}}>Manage Teams</Typography>
        <TableContainer sx={{border: "1px solid black", borderRadius: 2, p: 2}}>
          <Box sx={{mb: 3, display: "flex", justifyContent: "end"}}>
            <Button variant="contained" component={Link} to="/manage-teams/add">Add Team</Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Championships</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team._id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>$ {team.balance}</TableCell>
                  <TableCell>{team.championships}</TableCell>
                  <TableCell align="right" sx={{display: "flex", gap: 2}}>
                    <Button variant="contained" color="error" onClick={() => {handleTeamDelete(team._id)}}>Delete</Button>
                    <Button variant="contained" component={Link} to={`/manage-teams/${team._id}/edit`}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
};

export default ManageTeam;
