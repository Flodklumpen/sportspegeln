import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import './Tournament.css';

export function Tournament() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    console.log(form.tourName.value);
    console.log(form.owner.value);
    console.log(form.startDate.value);
    console.log(form.endDate.value);
    console.log(form.noEnd.checked);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Skapa turnering
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Skapa en turnering</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Turneringens namn:</Form.Label>
              <Form.Control name="tourName" type="input" placeholder="Min turnering" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ägare:</Form.Label>
              <Form.Control name="owner" placeholder="Användarens namn" readOnly />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Startdatum:</Form.Label>
                <Form.Control name="startDate" type="date"/>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Slutdatum:</Form.Label>
                <Form.Control name="endDate" type="date"/>
                <Form.Check name="noEnd" type="checkbox" label="Tillsvidare" />
              </Form.Group>
            </Form.Row>

            <Form.Row id="form-submit">
              <Form.Group className="submit-buttons">
                <Button variant="primary" type="submit" onClick={handleClose}>
                  Skapa turnering
                </Button>
              </Form.Group>

              <Form.Group className="submit-buttons">
                <Button variant="secondary" onClick={handleClose}>
                  Avbryt
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
