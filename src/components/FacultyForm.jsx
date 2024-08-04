import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import axios from "axios";

const FacultyForm = () => {
  const [studentData, setStudentData] = useState({
    _id: "",
    sname: "",
    email: "",
    password: "",
    gender: "",
    hobbies: [],
  });

  const [students, setStudents] = useState([]);

  const onInputChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const oncheckBoxChange = (e) => {
    const { value, checked } = e.target;
    setStudentData((prevState) => {
      const { hobbies } = prevState;
      if (checked) {
        return { ...prevState, hobbies: [...hobbies, value] };
      } else {
        return {
          ...prevState,
          hobbies: hobbies.filter((hobby) => hobby !== value),
        };
      }
    });
  };

  const clearForm = () => {
    setStudentData({
      sname: "",
      email: "",
      password: "",
      gender: "",
      hobbies: [],
    });
  };

  const API = "http://localhost:7001/";

  const getApi = () => {
    axios
      .get(`${API}student/get`)
      .then((res) => {
        setStudents(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (studentData._id) {
      axios
        .patch(`${API}student/edit/${studentData._id}`, studentData)
        .then((res) => {
          setStudents([...students, res.data.data]);
          getApi();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`${API}student/add`, studentData)
        .then((res) => {
          setStudents([...students, res.data.data]);
          getApi();
        })
        .catch((err) => console.log(err));
    }

    clearForm();
  };

  const onDatatDelete = (id) => {
    axios
      .delete(`${API}student/${id}`)
      .then((res) => {
        alert("Student deleted successfully!");
        getApi();
      })
      .catch((err) => console.log(err));
  };

  const onUpdateData = (_id) => {
    const upData = students.find((x) => x._id === _id);
    if (upData) {
      setStudentData({ ...upData });
    }
  };

  return (
    <div className="container mt-5">
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter your Name"
              name="sname"
              onChange={onInputChange}
              value={studentData.sname}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="abc@gmail.com"
              name="email"
              onChange={onInputChange}
              value={studentData.email}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter Your Password"
              name="password"
              onChange={onInputChange}
              value={studentData.password}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label>Gender</Form.Label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Check
              type="radio"
              id="radioMale"
              label="Male"
              name="gender"
              onChange={onInputChange}
              value="male"
              checked={studentData.gender === "male"}
            />
            <Form.Check
              type="radio"
              id="radioFemale"
              label="Female"
              name="gender"
              className="ms-2"
              onChange={onInputChange}
              value="female"
              checked={studentData.gender === "female"}
            />
            <Form.Check
              type="radio"
              id="radioOther"
              label="Other"
              name="gender"
              className="ms-2"
              onChange={onInputChange}
              value="other"
              checked={studentData.gender === "other"}
            />
          </div>
        </Row>

        <Row className="mb-3">
          <Form.Label>Hobbies</Form.Label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Check
              value="Reading"
              type="checkbox"
              id="checkboxReading"
              label="Reading"
              onChange={oncheckBoxChange}
              checked={studentData.hobbies.includes("Reading")}
            />
            <Form.Check
              value="Music"
              checked={studentData.hobbies.includes("Music")}
              type="checkbox"
              id="checkboxMusic"
              label="Music"
              className="ms-2"
              onChange={oncheckBoxChange}
            />
            <Form.Check
              value="Traveling"
              checked={studentData.hobbies.includes("Traveling")}
              type="checkbox"
              id="checkboxTraveling"
              label="Traveling"
              className="ms-2"
              onChange={oncheckBoxChange}
            />
          </div>
        </Row>

        <Button type="submit">Submit</Button>
        <Button type="button" className="ms-2" onClick={clearForm}>
          Cancel
        </Button>
      </Form>

      <Table striped bordered hover size="sm" className="mt-4">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((x, index) => (
            <tr key={index}>
              <td>{x.sname}</td>
              <td>{x.email}</td>
              <td>{x.gender}</td>
              <td>{x.hobbies.join(", ")}</td>
              <td>
                <Button variant="primary" onClick={() => onUpdateData(x._id)}>
                  Update
                </Button>{" "}
                <Button
                  variant="secondary"
                  onClick={() => onDatatDelete(x._id)}
                >
                  Delete
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FacultyForm;
