import "/Learning/learning-dashboard-main/src/css/Main.css";
import React from "react";
import { Tab, Nav, Row, Col, Container, Alert } from "react-bootstrap";
import { BsHouseDoorFill, BsFillGridFill } from "react-icons/bs";
import * as XLSX from "xlsx";
import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShowViewEmployeeDetails: false,
      setShowViewEmployeeComplianceDetails: false,
      setShowViewEmployeeNonComplianceDetails: false,
      setShowFileUploadSuccessMessage: false,
      setShowFileUploadErrorMessage: false,
      displayCoursedetails: false,
      dashBoardSuccess: false,
      dashBoardErrored: false,
      disable: true,
      disableGeneratebutton: true,
      complianceCourses: ["Security essentials"],
      fileData: [],
      data: [],
      compliance: [],
      noncompliance: [],
      selectedEmployeeLearnings: [],
    };
  }
  onSubmit = (event) => {
    event.preventDefault();
    let temp = [];
    for (var i = 0; i < this.state.fileData.length; i++) {
      let tempobj = {
        Name: "",
        CourseName: [],
        EmployeeID: "",
      };
      if (temp.length === 0) {
        tempobj.Name = this.state.fileData[i].Name;
        tempobj.CourseName = [this.state.fileData[i].CourseName];
        tempobj.EmployeeID = this.state.fileData[i].EmployeeID;
        temp = [...temp, tempobj];
      } else if (temp.length > 0) {
        var addData = false;
        for (var index = 0; index < temp.length; index++) {
          if (temp[index].EmployeeID === this.state.fileData[i].EmployeeID) {
            temp[index].CourseName = [
              ...temp[index].CourseName,
              this.state.fileData[i].CourseName,
            ];
            addData = false;
            break;
          } else {
            addData = true;
          }
        }

        if (addData) {
          tempobj.Name = this.state.fileData[i].Name;
          tempobj.CourseName = [this.state.fileData[i].CourseName];
          tempobj.EmployeeID = this.state.fileData[i].EmployeeID;
          temp = [...temp, tempobj];
        }
      }
    }
    let complianceEmployees = [];
    let noncomplianceEmployees = [];
    let complianceCourseCount = this.state.complianceCourses.length;

    for (var ind = 0; ind < temp.length; ind++) {
      let employeeComplianceCourseCount = 0;
      for (
        var complianceCoursesIndex = 0;
        complianceCoursesIndex < this.state.complianceCourses.length;
        complianceCoursesIndex++
      ) {
        for (
          var tempCourseIndex = 0;
          tempCourseIndex < temp[ind].CourseName.length;
          tempCourseIndex++
        ) {
          if (
            this.state.complianceCourses[complianceCoursesIndex] ===
            temp[ind].CourseName[tempCourseIndex]
          ) {
            employeeComplianceCourseCount++;
          }
        }
      }
      if (employeeComplianceCourseCount === complianceCourseCount) {
        complianceEmployees = [...complianceEmployees, temp[ind]];
      } else {
        noncomplianceEmployees = [...noncomplianceEmployees, temp[ind]];
      }
    }
    let dashboardsuccessMessage = false;
    let dashboardErrorMessage = false;
    if (
      temp.length > 0 &&
      (complianceEmployees.length > 0 || noncomplianceEmployees.length > 0)
    ) {
      dashboardsuccessMessage = true;
    } else {
      dashboardErrorMessage = false;
    }

    this.setState({
      ...this.state,
      data: temp,
      disable: false,
      compliance: complianceEmployees,
      noncompliance: noncomplianceEmployees,
      dashBoardSuccess: dashboardsuccessMessage,
      dashBoardErrored: dashboardErrorMessage,
    });
  };

  readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        this.setState({
          ...this.state,
          setShowFileUploadErrorMessage: true,
        });
        reject(error);
      };
    });

    promise.then((d) => {
      this.setState({
        fileData: d,
        setShowFileUploadSuccessMessage: true,
        disableGeneratebutton: false,
      });
    });
  };

  viewEmployeeDetails = () => {
    this.setState({
      ...this.state,
      setShowViewEmployeeDetails: true,
    });
  };

  hideViewEmployeeDetails = () => {
    this.setState({
      ...this.state,
      setShowViewEmployeeDetails: false,
    });
  };

  viewEmployeeCourseDetails = () => {
    this.setState({
      ...this.state,
      displayCoursedetails: true,
    });
  };

  hideEmployeeCourseDetails = () => {
    this.setState({
      ...this.state,
      displayCoursedetails: false,
    });
  };

  ViewEmployeeComplianceDetails = () => {
    this.setState({
      ...this.state,
      setShowViewEmployeeComplianceDetails: true,
    });
  };

  hideEmployeeComplianceDetails = () => {
    this.setState({
      ...this.state,
      setShowViewEmployeeComplianceDetails: false,
    });
  };

  ViewEmployeeNonComplianceDetails = () => {
    this.setState({
      ...this.state,
      setShowViewEmployeeNonComplianceDetails: true,
    });
  };

  hideEmployeeNonComplianceDetails = () => {
    this.setState({
      ...this.state,
      setShowViewEmployeeNonComplianceDetails: false,
    });
  };

  hideFileUploadSuccessMessage = () => {
    this.setState({
      ...this.state,
      setShowFileUploadSuccessMessage: false,
    });
  };

  hideFileUploadErrorMessage = () => {
    this.setState({
      ...this.state,
      setShowFileUploadErrorMessage: false,
    });
  };

  coursedetails = (learnings) => {
    this.setState({
      ...this.state,
      displayCoursedetails: true,
      selectedEmployeeLearnings: learnings,
    });
  };

  render() {
    let dashboardMessage = "";
    if (this.state.dashBoardSuccess) {
      dashboardMessage = (
        <Alert
          variant="success"
          style={{ width: "50rem", marginLeft: "13%", textAlign: "center" }}
        >
          Dashboard Genarated Successfully! click on Dashboard tab to view the
          learning details.
        </Alert>
      );
    } else if (this.state.dashBoardErrored) {
      dashboardMessage = (
        <Alert variant="danger">
          Dashboard Genaration failed please check uploaded file!
        </Alert>
      );
    }
    return (
      <Container fluid>
        <Tab.Container defaultActiveKey="home">
          <Row>
            <Col md={3} className="Sidebar">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <br></br>
                  <h2>Learning Dashboard</h2>
                  <br></br>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="home">
                    <BsHouseDoorFill size="30" className="Icons" />
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="dashboard" disabled={this.state.disable}>
                    <BsFillGridFill size="30" className="Icons" />
                    Dashboard
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col md={9} className="Body">
              <Tab.Content>
                <Tab.Pane eventKey="home">
                  <h2 className="Content">
                    Welcome to the Learning Dashboard <br></br>
                    This allows you to create a dashboard with excell sheet
                    <br></br>
                    Upload you excell sheet to view learning Dashboard
                  </h2>
                  <Container fluid className="Home">
                    <Home
                      onSubmit={this.onSubmit}
                      readExcel={this.readExcel}
                      setShowFileUploadSuccessMessage={
                        this.state.setShowFileUploadSuccessMessage
                      }
                      hideFileUploadSuccessMessage={
                        this.hideFileUploadSuccessMessage
                      }
                      setShowFileUploadErrorMessage={
                        this.state.setShowFileUploadErrorMessage
                      }
                      hideFileUploadErrorMessage={
                        this.hideFileUploadErrorMessage
                      }
                      disableGeneratebutton={this.state.disableGeneratebutton}
                    ></Home>
                    <br></br>
                    <br></br>
                    {dashboardMessage}
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="dashboard">
                  <Dashboard
                    data={this.state.data}
                    compliance={this.state.compliance}
                    noncompliance={this.state.noncompliance}
                    viewEmployeeDetails={this.viewEmployeeDetails}
                    setShowViewEmployeeDetails={
                      this.state.setShowViewEmployeeDetails
                    }
                    hideViewEmployeeDetails={this.hideViewEmployeeDetails}
                    ViewEmployeeComplianceDetails={
                      this.ViewEmployeeComplianceDetails
                    }
                    setShowViewEmployeeComplianceDetails={
                      this.state.setShowViewEmployeeComplianceDetails
                    }
                    hideEmployeeComplianceDetails={
                      this.hideEmployeeComplianceDetails
                    }
                    ViewEmployeeNonComplianceDetails={
                      this.ViewEmployeeNonComplianceDetails
                    }
                    setShowViewEmployeeNonComplianceDetails={
                      this.state.setShowViewEmployeeNonComplianceDetails
                    }
                    hideEmployeeNonComplianceDetails={
                      this.hideEmployeeNonComplianceDetails
                    }
                    coursedetails={this.coursedetails}
                    displayCoursedetails={this.state.displayCoursedetails}
                    hideEmployeeCourseDetails={this.hideEmployeeCourseDetails}
                    selectedEmployeeLearnings={
                      this.state.selectedEmployeeLearnings
                    }
                  ></Dashboard>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    );
  }
}

export default Main;
