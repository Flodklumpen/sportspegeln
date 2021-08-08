import React, {useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { ProfileList } from './ProfileList';
import styles from '../css/Profile.module.css';
import Alert from "react-bootstrap/Alert";
import { selectNrOfChallenges } from "../reducers/getNrOfChallenges";
import { useDispatch, useSelector } from "react-redux";
import { resetNrOfChallenges } from "../reducers/getNrOfChallenges";
import Button from "react-bootstrap/Button";

export function Profile() {

  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return (<div>Not authenticated</div>);
  }

  const scrollTo = (id) => {
    const elem = document.getElementById(id);
    elem.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  };

  function NewChallengeAlert() {
  const [, setShow] = useState(true);

  let newChallenges = useSelector(selectNrOfChallenges);

  function onClose() {
    setShow(false);
    document.getElementById("dismiss-new-challenges").style.display = "none";
    dispatch(resetNrOfChallenges());
  }

  if (newChallenges.length !== 0 && newChallenges.length !== undefined) {
    let alerts = [];

    for (let i = 0; i < newChallenges.length; i++) {
      alerts.push(
        <Alert key={i} variant="info" onClose={() => onClose()}>
          <Alert.Heading>Ny utmaning</Alert.Heading>
          <p>
            Du har blivit utmanad av { newChallenges[i].challenger } i turneringen { newChallenges[i].tournament }
          </p>
        </Alert>
      )
    }
    return(
    <div>
      <Button id={"dismiss-new-challenges"} variant="light" onClick={() => onClose()}>Stäng notiser</Button>
      {alerts}
    </div>
    );
  }
  return(<div></div>);
}
	return (
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <ListGroup as="ul" className={`${styles.profileText} d-block d-sm-none`}>
                <ListGroup.Item as="li">
                  <img src={user.picture} alt={user.name} /><br />
                  {user.name}<br />
                  {user.email}<br />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup as="ul" className={`${styles.profileText} ${styles.menu} d-none d-sm-block`}>
                <ListGroup.Item as="li">
                  <img src={user.picture} alt={user.name} /><br />
                  {user.name}<br />
                  {user.email}<br />
                </ListGroup.Item>
                <div>
                <ListGroup.Item action onClick={() => scrollTo("futureMatch")}>
                  Kommande matcher
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => scrollTo("pastMatch")}>
                  Tidigare matcher
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => scrollTo("ownedTournament")}>
                  Turneringar jag äger
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => scrollTo("competingTournament")}>
                  Turneringar jag tävlar i
                </ListGroup.Item>
                </div>
              </ListGroup>
            </Col>
            <Col xs={12} sm={8} className={styles.list}>
              <NewChallengeAlert />
              <ProfileList/>
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default Profile;
