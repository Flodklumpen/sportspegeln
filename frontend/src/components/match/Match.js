import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import styles from '../tournaments/features/createTournament/CreateTournament.module.css';
import Pencil from './pencil-fill.svg';
import { Formik } from 'formik';

export function Match(props) {
  /*
  Take in a match on the following format-ish:
  {
    tournamentName: STRING,
    date: STRING,
    time: STRING,
    challenger: STRING,
    defender: STRING,
    scoreChallenger: NUMBER,
    scoreDefender: NUMBER
  }
  */

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const submitMatch = (values) => {
    console.log(values.challenger);
    console.log(values.defender);
    console.log(values.date);
    console.log(values.time);

    if (props.report) {
      console.log(values.scoreChallenger);
      console.log(values.scoreDefender);
    };

    handleClose();
  };

  return (
    <div>
      <img src={Pencil} alt="Redigera" onClick={() => setShow(true)}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Redigera match</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={props.match}
            onSubmit={(values) => submitMatch(values)}
          >
            {({
              handleChange,
              handleSubmit,
              values
            }) => (
              <Form id="create-match-form" onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Utmanare:</Form.Label>
                  <Form.Control name="challenger" value={values.challenger} readOnly/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Försvarare:</Form.Label>
                  <Form.Control name="defender" value={values.defender} readOnly />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Datum:</Form.Label>
                    { props.report ?
                      <Form.Control name="date" type="date" value={values.date} onChange={handleChange} required/>
                      :
                      <Form.Control name="date" type="date" value={values.date} onChange={handleChange}/>
                    }
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Tid:</Form.Label>
                    { props.report ?
                      <Form.Control name="time" type="time" value={values.time} onChange={handleChange} required/>
                      :
                      <Form.Control name="time" type="time" value={values.time} onChange={handleChange}/>
                    }
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  { props.report ? '' :
                    <Form.Label><i>Datum och tid kan anges eller ändras senare</i></Form.Label>
                  }
                </Form.Row>

                { props.report ?
                  <div>
                    <Form.Row>
                      <Form.Label><b>Poäng</b></Form.Label>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Utmanare:</Form.Label>
                        <Form.Control name="scoreChallenger" type="number" value={values.scoreChallenger} onChange={handleChange} required/>
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Försvarare:</Form.Label>
                        <Form.Control name="scoreDefender" type="number" value={values.scoreDefender} onChange={handleChange} required/>
                      </Form.Group>
                    </Form.Row>
                  </div>
                  : ''
                }

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
            )}
          </Formik>
        </Modal.Body>
      </Modal>

    </div>
  );
}
