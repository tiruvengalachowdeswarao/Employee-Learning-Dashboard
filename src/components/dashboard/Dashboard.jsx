import React from "react";
import people from "/Learning/learning-dashboard-main/src/images/people.jpg";
import compliance from "/Learning/learning-dashboard-main/src/images/compliance.jpg";
import noncompliance from "/Learning/learning-dashboard-main/src/images/noncompliance.jpg";
import { Row, Col, Container, Button, Modal, Table } from "react-bootstrap";
import propTypes from "prop-types";
import DashboardModal from "./DashboardModal";
import DashboardTile from "./DashboardTile";

function Dashboard(props) {
  Dashboard.propTypes = {
    data: propTypes.array,
    viewEmployeeDetails: propTypes.func,
    setShowViewEmployeeDetails: propTypes.bool,
    hideViewEmployeeDetails: propTypes.func,
    compliance: propTypes.array,
    ViewEmployeeComplianceDetails: propTypes.func,
    setShowViewEmployeeComplianceDetails: propTypes.bool,
    hideEmployeeComplianceDetails: propTypes.func,
    ViewEmployeeNonComplianceDetails: propTypes.func,
    setShowViewEmployeeNonComplianceDetails: propTypes.bool,
    hideEmployeeNonComplianceDetails: propTypes.func,
    coursedetails: propTypes.func,
    hideEmployeeCourseDetails: propTypes.func,
    displayCoursedetails: propTypes.bool,
    selectedEmployeeLearnings: propTypes.array,
  };

  let employeeDetailsTableBody = props.data.map((obj, index) => {
    return (
      <tr key={index}>
        <td key={index}>{index + 1}</td>
        <td key={index}>{obj.EmployeeID}</td>
        <td key={index}>{obj.Name}</td>
      </tr>
    );
  });

  let employeeComplianceDetailsTableBody = props.compliance.map(
    (obj, index) => {
      return (
        <tr key={index}>
          <td key={index}>{index + 1}</td>
          <td key={index}>{obj.EmployeeID}</td>
          <td key={index}>{obj.Name}</td>
        </tr>
      );
    }
  );

  let employeeCourseDetailsTableBody = props.data.map((obj, index) => {
    return (
      <tr
        key={index}
        onClick={() => {
          props.coursedetails(obj.CourseName);
        }}
      >
        <td key={index}>{index + 1}</td>
        <td key={index}>{obj.EmployeeID}</td>
        <td key={index}>{obj.Name}</td>
      </tr>
    );
  });

  let employeeNonComplianceDetailsTableBody = props.noncompliance.map(
    (obj, index) => {
      return (
        <tr key={index}>
          <td key={index}>{index + 1}</td>
          <td key={index}>{obj.EmployeeID}</td>
          <td key={index}>{obj.Name}</td>
        </tr>
      );
    }
  );
  let employeeCourseDetails = "";
  if (props.displayCoursedetails) {
    employeeCourseDetails = props.selectedEmployeeLearnings.map(
      (obj, index) => {
        return (
          <tr key={index}>
            <td key={index}>{index + 1}</td>
            <td key={index}>{obj}</td>
          </tr>
        );
      }
    );
  }

  return (
    <Container>
      <div className="DashBoard">
        <Row>
          <Col xs="4">
            <DashboardTile
              title={"Employee Count"}
              count={props.data.length}
              viewDetails={props.viewEmployeeDetails}
              image={people}
              buttonText={"View Employee Details"}
            ></DashboardTile>
            <DashboardModal
              show={props.setShowViewEmployeeDetails}
              onHide={props.hideViewEmployeeDetails}
              tableBody={employeeDetailsTableBody}
            ></DashboardModal>
          </Col>

          <Col xs="4">
            <DashboardTile
              title={"Security compliance"}
              count={props.compliance.length}
              viewDetails={props.ViewEmployeeComplianceDetails}
              image={compliance}
              buttonText={"View Details"}
            ></DashboardTile>
            <DashboardModal
              show={props.setShowViewEmployeeComplianceDetails}
              onHide={props.hideEmployeeComplianceDetails}
              tableBody={employeeComplianceDetailsTableBody}
            ></DashboardModal>
          </Col>

          <Col xs="4">
            <DashboardTile
              title={"Security Non-compliance"}
              count={props.noncompliance.length}
              viewDetails={props.ViewEmployeeComplianceDetails}
              image={noncompliance}
              buttonText={"View Details"}
            ></DashboardTile>
            <DashboardModal
              show={props.setShowViewEmployeeNonComplianceDetails}
              onHide={props.hideEmployeeNonComplianceDetails}
              tableBody={employeeNonComplianceDetailsTableBody}
            ></DashboardModal>
          </Col>
        </Row>
      </div>
      <div className="CourseDetails">
        <h3>Employee Learning Details</h3>
        <div className="CourseTable">
          <Table
            bordered
            hover
            style={{
              margin: "0px",
              textAlign: "center",
              backgroundColor: "white",
            }}
          >
            <thead>
              <tr>
                <th>S No</th>
                <th>Employee ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{employeeCourseDetailsTableBody}</tbody>
          </Table>
        </div>
      </div>
      <Modal
        show={props.displayCoursedetails}
        onHide={props.hideEmployeeCourseDetails}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Employee Learning Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ModalTable">
            <Table bordered hover style={{ margin: "0px" }}>
              <thead>
                <tr>
                  <th>S NO</th>
                  <th>Course Name</th>
                </tr>
              </thead>
              <tbody>{employeeCourseDetails}</tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hideEmployeeCourseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;
