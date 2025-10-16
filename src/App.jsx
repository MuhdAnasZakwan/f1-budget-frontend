import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import DriverPage from "./pages/DriverPage";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "sonner";
import BudgetPage from "./pages/BudgetPage";
import AdminPage from "./pages/AdminPage";
import ManageDriver from "./pages/ManageDriver";
import ManageTeam from "./pages/ManageTeam";
import TeamAdd from "./pages/TeamAdd";
import TeamEdit from "./pages/TeamEdit";
import TeamSpecific from "./pages/TeamSpecific";
import DriverAdd from "./pages/DriverAdd";
import DriverEdit from "./pages/DriverEdit";
import DriverSpecific from "./pages/DriverSpecific";
import ManageSponsor from "./pages/ManageSponsors";
import SponsorAdd from "./pages/SponsorAdd";
import SponsorEdit from "./pages/SponsorEdit";
import ManageExpense from "./pages/ManageExpense";
import ExpenseAdd from "./pages/ExpenseAdd";
import ExpenseEdit from "./pages/ExpenseEdit";

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/teams" element={<TeamPage />} />
            <Route path="/teams/:id" element={<TeamSpecific/>} />

            <Route path="/drivers" element={<DriverPage />} />
            <Route path="/drivers/:id" element={<DriverSpecific/>}/>

            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/admin" element={<AdminPage />} />

            <Route path="/manage-drivers" element={<ManageDriver />} />
            <Route path="/manage-drivers/add" element={<DriverAdd/>} />
            <Route path="/manage-drivers/:id/edit" element={<DriverEdit/>}/>

            <Route path="/manage-teams" element={<ManageTeam/>} />
            <Route path="/manage-teams/add" element={<TeamAdd/>} />
            <Route path="/manage-teams/:id/edit" element={<TeamEdit/>} />

            <Route path="/manage-sponsors" element={<ManageSponsor/>} />
            <Route path="/manage-sponsors/add" element={<SponsorAdd/>} />
            <Route path="/manage-sponsors/:id/edit" element={<SponsorEdit/>}/>

            <Route path="/manage-expenses" element={<ManageExpense/>} />
            <Route path="/manage-expenses/add" element={<ExpenseAdd/>} />
            <Route path="/manage-expenses/:id/edit" element={<ExpenseEdit/>} />

            <Route path="/signin" element={<SigninPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
