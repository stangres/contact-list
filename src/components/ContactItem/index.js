import React, { Fragment, useState, useEffect, useCallback } from 'react';
import {Card, Icon, Loader, Message} from 'semantic-ui-react';
import { useObserver } from 'mobx-react-lite'
import PhoneItem from './PhoneItem';
import EmailItem from './EmailItem';
import SocialItem from './SocialItem';
import NameItem from './NameItem';
import { deleteContact } from "../../stores/ContactListStore/actions";
import './style.scss';

export default React.memo(({ model }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    // заполняем модель
    const result = await model.load();
    setError(!result);
    setIsLoading(false);
  }, [model]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const _deleteContact = () => {
    deleteContact(model.id);
  }

  const setEditMode = () => {
    model.setEditMode(!model.editMode);
  }

  return useObserver(() => (
    <Card className={"contact-item"}
          fluid
    >
      { error ?
        <Message negative>
          <Message.Header>{"Ошибка загрузки данных"}</Message.Header>
        </Message>
        :
        (isLoading ?
        <Loader active inline={"centered"} className={"contact-item__loader"}/>
        :
        <Fragment>
          <Card.Content>
            <Card.Header>
              <div className={"contact-item__header"}>
                <div className={"contact-item__name"}>
                  <NameItem model={model}/>
                </div>
                <div className={"contact-item__tools"}>
                  <Icon link
                        name={"edit"}
                        size={"small"}
                        color={model.editMode ? 'blue' : null}
                        onClick={setEditMode}
                  />
                  <Icon link
                        name={"refresh"}
                        size={"small"}
                        onClick={refresh}
                  />
                  <Icon link
                        name={"delete"}
                        size={"small"}
                        onClick={_deleteContact}
                  />
                </div>
              </div>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <PhoneItem model={model}/>
          </Card.Content>
          <Card.Content>
            <EmailItem model={model}/>
          </Card.Content>
          <Card.Content>
            <SocialItem model={model}/>
          </Card.Content>
          <Card.Content/>
        </Fragment>)
      }
    </Card>
  ));
});