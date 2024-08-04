import "./App.css";
import Error from "./components/Error";
import FacultyForm from "./components/FacultyForm";
import NavBar from "./components/NavBar";
import StudentForm from "./components/StudentForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
          <NavBar/>
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/faculty" element={<FacultyForm />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
