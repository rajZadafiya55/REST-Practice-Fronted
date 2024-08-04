import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

const StudentForm = () => {
  const [studentData, setStudentData] = useState({
    sname: "",
    email: "",
    password: "",
    gender: "",
    hobbies: [],
  });

  const onInputChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const oncheckBoxChange = (e) => {
    setStudentData({
      ...studentData,
      ...studentData.hobbies.push(e.target.value),
    });
  };

  const clearFrom = () => {
    setStudentData({
      sname: "",
      email: "",
      password: "",
      gender: "",
      hobbies: [],
    });
  };

  const [students, setStudents] = useState([]);
  const [myIndex, setMyIndex] = useState(null);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("student")) || [];
    setStudents(storedStudents);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("studentForm", studentData);

    let updatedStudents = [...students];

    if (myIndex == null) {
      updatedStudents.push(studentData);
    } else {
      updatedStudents[myIndex] = studentData;
      setMyIndex(null);
    }
    
    setStudents(updatedStudents);
    localStorage.setItem("student", JSON.stringify(updatedStudents));
    clearFrom();
  };

  const onDatatDelete = (index) => {
    let studData = [...students];
    studData.splice(index, 1);
    setStudents(studData);
    localStorage.setItem("student", JSON.stringify(studData));
  };

  console.log("studentsss", students);

  const onUpdateData = (index) => {
    let studData = [...students];
    console.log(studData[index]);

    setStudentData(studData[index]);
    setMyIndex(index);
  };
  return (
    <div className="container mt-5">
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Student name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter your Name"
              name="sname"
              onChange={onInputChange}
              value={studentData?.sname}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="abc@gmail.com"
              name="email"
              onChange={onInputChange}
              value={studentData?.email}
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
              value={studentData?.password}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3 ">
          <Form.Label>Gender</Form.Label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Check
              type="radio"
              id="radio"
              label="Male"
              name="gender"
              onChange={onInputChange}
              value="male"
              checked={studentData.gender === "male"}
            />
            <Form.Check
              type="radio"
              id="radio"
              label="FeMale"
              name="gender"
              className="ms-2"
              onChange={onInputChange}
              value="feMale"
              checked={studentData.gender === "female"}
            />
            <Form.Check
              type="radio"
              id="radio"
              label="Other"
              name="gender"
              className="ms-2"
              onChange={onInputChange}
              value="other"
              checked={studentData.gender === "other"}
            />
          </div>
        </Row>

        <Row className="mb-3 ">
          <Form.Label>Hobbies</Form.Label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Check
              value="Reading"
              type="checkbox"
              id="checkbox"
              label="Reading"
              name="Reading"
              onChange={oncheckBoxChange}
              checked={studentData?.hobbies?.includes("Reading")}
            />
            <Form.Check
              value="Music"
              checked={studentData?.hobbies?.includes("Music")}
              type="checkbox"
              id="checkbox"
              label="Music"
              name="Music"
              className="ms-2"
              onChange={oncheckBoxChange}
            />
            <Form.Check
              value="Traveling"
              checked={studentData?.hobbies?.includes("Traveling")}
              type="checkbox"
              id="checkbox"
              label="Traveling"
              name="Traveling"
              className="ms-2"
              onChange={oncheckBoxChange}
            />
          </div>
        </Row>

        <Button type="submit">Submit</Button>
        <Button type="button" className="ms-2" onClick={clearFrom}>
          Cancle
        </Button>
      </Form>

      {/* table  */}

      <Table striped bordered hover size="sm" className="mt-4">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>gender</th>
            <th>Hobbies</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((x, index) => {
            return (
              <tr key={index}>
                <td>{x.sname}</td>
                <td>{x.email}</td>
                <td>{x.gender}</td>
                <td>{x.hobbies?.map((x) => x)}</td>
                <td>
                  <Button variant="primary" onClick={() => onUpdateData(index)}>
                    Update
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    onClick={() => onDatatDelete(index)}
                  >
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentForm;
