import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import styles from '../css/SubmitModal.module.css';
import Pencil from '../images/pencil-fill.svg';
import { Formik } from 'formik';
import { editMatch, reportMatch } from '../reducers/changeMatch';
import { useSelector, useDispatch } from "react-redux";

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

  const dispatch = useDispatch();

  let currentState = useSelector((state) => state);

  const token = currentState.userToken['currentUserToken'];

  const user = currentState.userData;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const match = props.match;

  const [showConfirm, setShowConfirm] = useState(false);

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  const dispatchReport = (values) => {
    dispatch(reportMatch(
      match.tournament_id, match.id, values.date, values.time,
      values.score_challenger, values.score_defender, user.email, token));
    handleCloseConfirm();
    handleClose();
  };

  const submitMatch = (values) => {

    if (props.report) {
      setShowConfirm(true);
    } else {
      dispatch(editMatch(
        match.tournament_id, match.id, values.date, values.time, user.email,
        token
      ));
      handleClose();
    }

  };

  return (
    <div>
      { (props.report && match.reported) ? '' :
        <img src={Pencil} alt="Redigera" onClick={() => setShow(true)}/>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Redigera match</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={match}
            onSubmit={submitMatch}
          >
            {({
              handleChange,
              handleSubmit,
              values
            }) => (
              <Form id="create-match-form" onSubmit={handleSubmit}>
                <Form.Group controlId="match-modal-challenger">
                  <Form.Label>Utmanare:</Form.Label>
                  <Form.Control name="challenger" value={values.challenger} readOnly/>
                </Form.Group>

                <Form.Group controlId="match-modal-defender">
                  <Form.Label>Försvarare:</Form.Label>
                  <Form.Control name="defender" value={values.defender} readOnly />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="match-modal-date">
                    <Form.Label>Datum:</Form.Label>
                    { props.report ?
                      <Form.Control name="date" type="date" value={values.date || ""} onChange={handleChange} required/>
                      :
                      <Form.Control name="date" type="date" value={values.date || ""} onChange={handleChange}/>
                    }
                  </Form.Group>

                  <Form.Group as={Col} controlId="match-modal-time">
                    <Form.Label>Tid:</Form.Label>
                    { props.report ?
                      <Form.Control name="time" type="time" value={values.time || ""} onChange={handleChange} required/>
                      :
                      <Form.Control name="time" type="time" value={values.time || ""} onChange={handleChange}/>
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
                      <Form.Group as={Col} controlId="match-modal-score-challenger">
                        <Form.Label>Utmanare:</Form.Label>
                        <Form.Control name="score_challenger" type="number" value={values.score_challenger || ""} onChange={handleChange} required/>
                      </Form.Group>

                      <Form.Group as={Col} controlId="match-modal-score-defender">
                        <Form.Label>Försvarare:</Form.Label>
                        <Form.Control name="score_defender" type="number" value={values.score_defender || ""} onChange={handleChange} required/>
                      </Form.Group>
                    </Form.Row>
                  </div>
                  : ''
                }

                <Form.Row id="form-submit">
                  <Form.Group className={styles.submitArea}>
                    { props.report ?
                      <div>
                        <Button variant="primary" type="submit">
                          Rapportera
                        </Button>

                        <Modal show={showConfirm} onHide={handleCloseConfirm}>
                          <Modal.Header closeButton>
                            <Modal.Title>Bekräfta rapportering</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Är du säker på att du vill rapportera dessa resultat? Detta kan inte ändras i efterhand.
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseConfirm}>
                              Avbryt
                            </Button>
                            <Button variant="primary" onClick={() => dispatchReport(values)}>
                              Ja
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                      :
                      <Button variant="primary" type="submit">
                        Spara
                      </Button>
                    }

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
