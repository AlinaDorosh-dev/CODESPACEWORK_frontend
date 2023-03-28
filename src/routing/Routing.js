import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../views/HomePage";
import CandidateSinglePage from "../views/CandidateSinglePage";
import ManageJobsPage from "../views/ManageJobsPage";
import Header from "../components/HeaderFooter/Header";
import Footer from "../components/HeaderFooter/Footer";
import ForgottenPasswordPage from "../views/ForgottenPasswordPage";
import ResetPasswordPage from "../views/ResetPasswordPage";
import CandidatesDashboard from "../views/CandidatesDashboard";
import Allaplicants from "../views/AllAplicants";
import EmployerSinglePage from "../views/EmployerSinglePage";
import ChangePassword from "../views/ChangePassword";
import Curriculum from "../components/curriculum/Curriculum";
import ErrorPage from "../views/ErrorPage";
import UnauthorizedPage from "../views/UnauthorizedPage";
import { JobList } from "../views/JobList";
import CandidateList from "../views/CandidateList";
import PostAJobComponents from "../views/PostAJob.components";
import CandidateProfile from "../views/CandidateProfile.component";
import CompanyProfile from "../views/CompanyProfile.component";
import EmployersDashboard from "../views/EmployersDashboard";
import AppliedJobsPage from "../views/AppliedJobsPage";
import AboutUs from "../components/navbar/AboutUs";
import Contact from "../components/navbar/Contact";
import JobDetails from "../views/JobDetail.component";

import LoginModalProvider from "../providers/LoginModalProvider";
import RequireAuth from "../auth/RequireAuth";

const Routing = () => {
  return (
    <Router>
      <LoginModalProvider>
        <Header />
      </LoginModalProvider>

      <Routes>
        {/* Rutas no protegidas */}
        <Route path='/' element={<HomePage />} />
        <Route path='aboutus' element={<AboutUs />} />
        <Route path='contact' element={<Contact />} />
        <Route path='forgottenpassword' element={<ForgottenPasswordPage />} />
        <Route path='reset-password/:token' element={<ResetPasswordPage />} />
        <Route path='unauthorized' element={<UnauthorizedPage />} />
        <Route path='*' element={<ErrorPage />} />

        {/* Ruta con authenticacion con acceso tanto para candidatos como para empleadores */}

        <Route element={<RequireAuth allowedRole="both" />}>
          <Route path="auth/change-password" element={<ChangePassword />} />
          <Route path="candidate/:loginId" element={<CandidateSinglePage />} />
          <Route path="employer/:id" element={<EmployerSinglePage />} />
          <Route path="job/job-single/:jobId" element={<JobDetails />} />

        </Route>

        {/* Rutas de candidatos */}
        <Route
          path="candidates-dashboard"
          element={<RequireAuth allowedRole="candidate" />}
        >
          <Route index element={<CandidatesDashboard />} />
          <Route path="profile/:id" element={<CandidateProfile />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="job/job-list" element={<JobList />} />
          <Route path="applied-jobs" element={<AppliedJobsPage />} />
        </Route>

        {/* Rutas de empleadores */}
        <Route
          path="employers-dashboard"
          element={<RequireAuth allowedRole="employer" />}
        >
          <Route index element={<EmployersDashboard />} />
          <Route path="candidate/all-candidates" element={<CandidateList />} />

          <Route path="profile/:id" element={<CompanyProfile />} />

          {/* Entiendo que la ruta all-applicants deberia de ir concatenado con job  !!!CONFIRMAR */}

          <Route path="all-applicants" element={<Allaplicants />} />
          <Route path="job/employer-jobs" element={<ManageJobsPage />} />
          <Route path="post-a-job" element={<PostAJobComponents />} />
          <Route path="post-a-job/:jobId" element={<PostAJobComponents />} />
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
};

export default Routing;
