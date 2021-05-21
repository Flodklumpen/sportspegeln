import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import styles from '../css/SubmitModal.module.css';
import Pencil from '../images/pencil-fill.svg';
import { Formik } from 'formik';
//import { editMatch } from '../reducers/editMatch';
import { editMatch, reportMatch } from '../reducers/changeMatch';
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
//import { reportMatch } from '../reducers/reportMatch';

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

  const { user } = useAuth0();

  const dispatch = useDispatch();

  let currentState = useSelector((state) => state);

  const token = currentState.userToken['currentUserToken'];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const match = props.match;

  const submitMatch = (values) => {

    if (props.report) {
      dispatch(reportMatch(
        match.tournament_id, match.id, values.date, values.time,
        values.score_challenger, values.score_defender, user.email, token
      ));
    } else {
      dispatch(editMatch(
        match.tournament_id, match.id, values.date, values.time, user.email,
        token
      ));
    }

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
            initialValues={match}
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
                        <Form.Control name="score_challenger" type="number" value={values.score_challenger} onChange={handleChange} required/>
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Försvarare:</Form.Label>
                        <Form.Control name="score_defender" type="number" value={values.score_defender} onChange={handleChange} required/>
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
