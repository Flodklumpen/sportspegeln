import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Profile.module.css';
import { ProfileList } from './features/ProfileList';

export function Profile() {
  const matches = ["Match 1", "Match 2", "Match 3", "Match 4"];
  const listItems = matches.map((match) =>
    <li>{match}</li>
  );

  const show_hide_list = (id) => {
    if (document.getElementById(id).className === "d-block d-md-block") {
      document.getElementById(id).className = "d-none d-md-block";
    } else {
      document.getElementById(id).className = "d-block d-md-block";
    }
  }

  return (
    <div>
      <Container>
        <Row>
          <Col sm={12} md={4} className={styles.profiletext}>
            <div>
              test@example.com <br />

              Test Person <br />
            </div>
          </Col>
          <Col sm={12} md={8} className={styles.list}>
            <ProfileList/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
