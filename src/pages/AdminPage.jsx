import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import { Groups, Handshake, ReceiptLong, SportsMotorsports } from "@mui/icons-material";
import { Link } from "react-router";

const AdminPage = () => {
 return (
  <>
    <Header current="admin"/>
    <Container sx={{p: 3}}>
      <Typography variant="h3" sx={{mb: 3}}>Admin Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid size={{sm: 12, md: 6, lg: 3}}>
          <Button fullWidth sx={{border: "1px solid black", borderRadius: 2, p: 2, display: "flex", flexDirection: "column"}} component={Link} to="/manage-drivers">
            <SportsMotorsports sx={{fontSize: 200}}/>
            <Typography variant="body1" sx={{textAlign: "center"}}>Manage Drivers</Typography>
          </Button>
        </Grid>
        <Grid size={{sm: 12, md: 6, lg: 3}}>
          <Button fullWidth sx={{border: "1px solid black", borderRadius: 2, p: 2, display: "flex", flexDirection: "column"}} component={Link} to="/manage-teams">
            <Groups sx={{fontSize: 200}}/>
            <Typography variant="body1" sx={{textAlign: "center"}}>Manage Teams</Typography>
          </Button>
        </Grid>
        <Grid size={{sm: 12, md: 6, lg: 3}}>
          <Button fullWidth sx={{border: "1px solid black", borderRadius: 2, p: 2, display: "flex", flexDirection: "column"}} component={Link} to="/manage-sponsors">
            <Handshake sx={{fontSize: 200}}/>
            <Typography variant="body1" sx={{textAlign: "center"}}>Manage Sponsors</Typography>
          </Button>
        </Grid>
        <Grid size={{sm: 12, md: 6, lg: 3}}>
          <Button fullWidth sx={{border: "1px solid black", borderRadius: 2, p: 2, display: "flex", flexDirection: "column"}} component={Link} to="/manage-expenses">
            <ReceiptLong sx={{fontSize: 200}}/>
            <Typography variant="body1" sx={{textAlign: "center"}}>Manage Expenses</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  </>
 )
}

export default AdminPage;