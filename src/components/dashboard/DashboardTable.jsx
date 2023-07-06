import React from "react";
import { Table } from "react-bootstrap";

function DashboardTable(props) {
  let tableHead = "";
  let tableBody = "";
  if (props.tileTable || props.mainTable) {
    tableHead = (
      <thead>
        <tr>
          <th>S No</th>
          <th>Employee ID</th>
          <th>Name</th>
        </tr>
      </thead>
    );
    if (props.mainTable) {
      tableBody = props.data.map((obj, index) => {
        return (
          <tbody>
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
          </tbody>
        );
      });
    } else {
      tableBody = props.data.map((obj, index) => {
        return (
          <tbody>
            <tr key={index}>
              <td key={index}>{index + 1}</td>
              <td key={index}>{obj.EmployeeID}</td>
              <td key={index}>{obj.Name}</td>
            </tr>
          </tbody>
        );
      });
    }
  } else {
    tableHead = (
      <thead>
        <tr>
          <th>S NO</th>
          <th>Course Name</th>
        </tr>
      </thead>
    );
    tableBody = props.data.map((obj, index) => {
      return (
        <tbody>
          <tr key={index}>
            <td key={index}>{index + 1}</td>
            <td key={index}>{obj}</td>
          </tr>
        </tbody>
      );
    });
  }

  return (
    <Table
      bordered
      hover
      style={{
        margin: "0px",
        textAlign: "center",
        backgroundColor: "white",
      }}
    >
      {tableHead}
      {tableBody}
    </Table>
  );
}

export default DashboardTable;
