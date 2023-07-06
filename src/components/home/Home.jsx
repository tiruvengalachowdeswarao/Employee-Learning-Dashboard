import React from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import propTypes from "prop-types";

function Home(props) {
  const onSubmit = (event) => {
    props.onSubmit(event);
  };
  const readExcel = (f) => {
    props.readExcel(f);
  };

  Home.propTypes = {
    onSubmit: propTypes.func,
    setShowFileUploadSuccessMessage: propTypes.bool,
    hideFileUploadSuccessMessage: propTypes.func,
    hideFileUploadErrorMessage: propTypes.func,
    disableGeneratebutton: propTypes.bool,
  };
  return (
    <Form onSubmit={onSubmit}>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
              }}
            />
          </Form.Group>
          <Modal
            show={props.setShowFileUploadSuccessMessage}
            onHide={props.hideFileUploadSuccessMessage}
            centered
            style={{ textAlign: "center", color: "green" }}
          >
            <Modal.Body>
              File Uploaded Successfully.<br></br>
              Click on <b>Generate Dashboard</b> button to generate the
              dashboard.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                onClick={props.hideFileUploadSuccessMessage}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={props.setShowFileUploadErrorMessage}
            onHide={props.hideFileUploadErrorMessage}
            centered
            style={{ textAlign: "center", color: "red" }}
          >
            <Modal.Body>
              Unable to upload the file<br></br>
              please check the format of the file
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={props.hideFileUploadErrorMessage}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <br></br>
      <Row className="justify-content-md-center">
        <Col md="3">
          <Button
            variant="success"
            type="submit"
            disabled={props.disableGeneratebutton}
          >
            Generate Dashboard
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Home;
