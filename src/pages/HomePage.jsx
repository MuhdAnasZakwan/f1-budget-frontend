import { Link } from "react-router";
import Header from "../components/Header";
import { Box, Button, Container, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Header/>
      <Box sx={{position: "relative", height: "90vh", backgroundImage: "url('/f1-bg.png')", backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", color: "white", textAlign: "center"}}>
        <Box sx={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1}}/>
        <Container sx={{position: "relative", zIndex: 2, backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
          <Typography variant="h2" sx={{fontWeight: "bold", mb: 2}}>F1 Budget Manager</Typography>
          <Button variant="contained" size="large" color="error" component={Link} to="/teams" sx={{ fontWeight: "bold", borderRadius: 2 }}>View Teams</Button>
        </Container>
      </Box>
    </>
  );
}

export default HomePage;