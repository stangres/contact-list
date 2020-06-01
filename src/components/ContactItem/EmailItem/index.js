import React from 'react';
import { Form, Icon, Input, Label, Message } from 'semantic-ui-react';
import { useObserver } from 'mobx-react-lite'
import { useContactStateEditable } from '../../../hooks';
import { errorMessage } from '../item-error';
import './style.scss';

export default ({ model }) => {

  const elementId = "form-input-email-" + model.id;

  const {
    error,
    onClick,
    onBlur,
    onSubmit,
    onEdit,
    onDelete,
    onChange,
    editingData,
    value
  } = useContactStateEditable({
    submitCb,
    validateOnSubmit,
    clearOnSubmit: true,
    elementId,
    dataIdKey: 'id',
    dataValueKey: 'email',
    deleteCb: model.deleteEmail,
    editMode: model.editMode
  });

  function validateOnSubmit(value) {
    return value !== '' && (!editingData || editingData.email !== value) ;
  }

  function submitCb(value) {
    return editingData ? model.updateEmail(editingData.id, value) : model.addEmail(value);
  }

  return useObserver(() => (
    <Form onSubmit={onSubmit}
          className={"email-container"}
          error={error}
    >
      <Message error
               content={errorMessage}
      />
      {model.emails.map(item => (
        <Form.Field key={item.id}>
          <Label className={"email-container__item"}
                 color={editingData && editingData.id === item.id ? "grey" : null}
          >
            <Icon name={"mail"}/>
            <span className={"email-container__email"}>{item.email}</span>
            {model.editMode ?
              <span className={"email-container__tools"}>
                <Icon link
                      name={"edit"}
                      onClick={() => onEdit(item)}
                />
                <Icon link
                      name={"delete"}
                      onClick={() => onDelete(item)}
                />
              </span>
              :
              null
            }
          </Label>
        </Form.Field>))
      }
      {model.editMode ?
        <Form.Field id={elementId}
                    control={Input}
                    name={"email"}
                    placeholder={"E-mail"}
                    onClick={onClick}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    fluid
        />
        :
        null
      }
    </Form>
  ));
}