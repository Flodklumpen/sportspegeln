import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import styles from './../tournament/Tournament.module.css';
import Pencil from './pencil-fill.svg';

export function Match(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    console.log(form.challenger.value);
    console.log(form.defender.value);
    console.log(form.date.value);
    console.log(form.time.value);

    if (props.report) {
      console.log(form.scoreChallenger.value);
      console.log(form.scoreDefender.value);
    };

    handleClose();
  };

  const getReportForm = (report) => {
    if(report) {
      return (
        <div>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Datum:</Form.Label>
              <Form.Control name="date" type="date" required/>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Tid:</Form.Label>
              <Form.Control name="time" type="time" required/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Label><b>Poäng</b></Form.Label>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Utmanare:</Form.Label>
              <Form.Control name="scoreChallenger" type="number" required/>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Försvarare:</Form.Label>
              <Form.Control name="scoreDefender" type="number" required/>
            </Form.Group>
          </Form.Row>
        </div>
      );
    } else {
      return (
        <div>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Datum:</Form.Label>
              <Form.Control name="date" type="date"/>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Tid:</Form.Label>
              <Form.Control name="time" type="time" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Label><i>Datum och tid kan anges eller ändras senare</i></Form.Label>
          </Form.Row>
        </div>
      );
    };
  };

  return (
    <div>
      <img src={Pencil} alt="Redigera" onClick={() => setShow(true)}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Skapa en match</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form id="create-match-form" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Utmanare:</Form.Label>
              <Form.Control name="challenger" value={getUserName()} readOnly/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Försvarare:</Form.Label>
              <Form.Control name="defender" value={getUserName()} readOnly />
            </Form.Group>

            {getReportForm(props.report)}

            <Form.Row id="form-submit">
              <Form.Group className={styles.submitArea}>
                <Button variant="primary" type="submit">
                  Spara
                </Button>
              </Form.Group>

              <Form.Group className={styles.submitButtons}>
                <Button variant="secondary" onClick={handleClose}>
                  Avbryt
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

/**
 * Returns a pleceholder name for now.
 */
function getUserName() {
  return (
      "Kalles Kaviar"
  );
}
