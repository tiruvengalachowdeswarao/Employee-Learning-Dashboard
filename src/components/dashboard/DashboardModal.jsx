import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

function DashboardModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ModalTable">
          <Table
            bordered
            hover
            style={{
              margin: "0px",
              textAlign: "center",
              backgroundColor: "white",
            }}
          >
            {props.tableBody}
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DashboardModal;
