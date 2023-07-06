import React from "react";
import people from "/Learning/learning-dashboard-main/src/images/people.jpg";
import compliance from "/Learning/learning-dashboard-main/src/images/compliance.jpg";
import noncompliance from "/Learning/learning-dashboard-main/src/images/noncompliance.jpg";
import { Row, Col, Container } from "react-bootstrap";
import propTypes from "prop-types";
import DashboardModal from "./DashboardModal";
import DashboardTile from "./DashboardTile";
import DashboardTable from "./DashboardTable";

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

  let employeeDetailsTableBody = (
    <DashboardTable data={props.data} tileTable={true}></DashboardTable>
  );

  let employeeComplianceDetailsTableBody = (
    <DashboardTable data={props.compliance} tileTable={true}></DashboardTable>
  );

  let employeeNonComplianceDetailsTableBody = (
    <DashboardTable
      data={props.noncompliance}
      tileTable={true}
    ></DashboardTable>
  );

  let employeeCourseDetails = "";
  if (props.displayCoursedetails) {
    employeeCourseDetails = (
      <DashboardTable
        data={props.selectedEmployeeLearnings}
        tileTable={false}
      ></DashboardTable>
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
          <DashboardTable
            data={props.data}
            mainTable={true}
            coursedetails={props.coursedetails}
          ></DashboardTable>
        </div>
      </div>
      <DashboardModal
        show={props.displayCoursedetails}
        onHide={props.hideEmployeeCourseDetails}
        tableBody={employeeCourseDetails}
      ></DashboardModal>
    </Container>
  );
}

export default Dashboard;
