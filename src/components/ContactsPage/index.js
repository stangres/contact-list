import React, { useEffect } from 'react';
import { Grid, Button, Container, Form } from 'semantic-ui-react';
import { useObserver } from 'mobx-react-lite'
import { useStores } from '../../hooks';
import ContactItem from '../ContactItem';
import { loadContacts, addContact, setSearch } from '../../stores/ContactListStore/actions';
import './style.scss';

export default () => {
  const { contactListStore } = useStores();

  useEffect(() => {
    loadContacts();
  }, []);

  const onSearch = (e) => {
    const value = e.target.elements['search'].value;
    setSearch(value);
  };

  return useObserver(() => {
    const items = contactListStore.items.map(model => (
      <Grid.Column mobile={16} tablet={8} computer={4} key={model.id}>
        <ContactItem model={model}/>
      </Grid.Column>
    ));

    return (
      <div className={"contacts-page"}>
        <Container textAlign={"center"}>
          <Form className={"search-form"}
                onSubmit={onSearch}
          >
            <Form.Input icon={"search"}
                        name={"search"}
                        placeholder={"Поиск..."}
            />
          </Form>
        </Container>
        <Grid>
          {items}
        </Grid>
        <Button className={"btn-add-contact"}
                primary
                circular
                icon={"user plus"}
                size={"big"}
                onClick={addContact}
        />
      </div>
    );
  });
};