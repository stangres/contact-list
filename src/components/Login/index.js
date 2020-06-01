import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { authenticate } from '../../stores/AuthStore/actions';
import './style.scss';

export default () => {
  const [ isLoading, setLoading ] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');

  const handleUsername = (e, { value }) => {
    setUsername(value);
  };

  const handlePassword = (e, { value }) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const result = await authenticate({
      username,
      password
    });

    if (!result) {
      setLoading(false);
    }
  };

  return (
    <Grid textAlign="center"
          verticalAlign="middle"
          className="login-page"
    >
      <Grid.Column>
        <Header as="h2"
                color="teal"
                textAlign="center">
          Вход в аккаунт
        </Header>
        <Form onSubmit={handleSubmit}
              loading={isLoading}
              size="large"
        >
          <Segment >
            <Form.Input name="username"
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Логин"
                        required
                        value={username}
                        onChange={handleUsername}
            />
            <Form.Input name="password"
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Пароль"
                        type="password"
                        required
                        value={password}
                        onChange={handlePassword}
            />

            <Button type="submit"
                    color="teal"
                    fluid
                    size="large"
            >
              Войти
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}