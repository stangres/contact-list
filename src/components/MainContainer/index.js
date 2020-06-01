import React from 'react';
import { Container, Menu, Button, Icon } from 'semantic-ui-react';
import { unauthenticate } from '../../stores/AuthStore/actions';
import './style.scss';

export default ({ children, username }) => {
  return (
    <div>
      <Menu fixed="top">
        <Menu.Menu position="right">
          <Menu.Item>
            <Menu.Item header
                       content={username}
            />
            <Button color="teal"
                    onClick={unauthenticate}
            >
              <Icon name="sign-out" />
              Выйти
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Container className="main-container">
        {children}
      </Container>
    </div>
  );
}