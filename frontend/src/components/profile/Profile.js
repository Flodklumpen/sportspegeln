import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Profile.module.css';
import { ProfileList } from './features/ProfileList';
import { useAuth0 } from "@auth0/auth0-react";

export function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>
  }

	return (
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={4} className={styles.profiletext}>
              <div>
                <img src={user.picture} alt={user.name} /><br />
                {user.name}<br />
                {user.email}<br />
              </div>
            </Col>
            <Col xs={12} sm={8} className={styles.list}>
              <ProfileList/>
            </Col>
          </Row>
        </Container>
      </div>
  );

}

export default Profile;
