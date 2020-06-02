import React from 'react';
import { Form, Icon, Input, Label, Message } from 'semantic-ui-react';
import { useObserver } from 'mobx-react-lite'
import { useContactStateEditable } from '../../../hooks';
import { errorMessage } from '../item-error';
import './style.scss';

export default ({ model }) => {

  const elementId = "form-input-email-" + model.id;

  const {
    state,
    onClick,
    onBlur,
    onSubmit,
    onEdit,
    onDelete,
    onChange
  } = useContactStateEditable({
    submitCb,
    validateOnSubmit,
    clearOnSubmit: true,
    elementId,
    dataIdKey: 'id',
    dataValueKey: 'email',
    deleteCb: model.deleteEmail,
    isEditMode: model.isEditMode
  });

  function validateOnSubmit(value) {
    return value !== '' && (!state.editingData || state.editingData.email !== value) ;
  }

  function submitCb(value) {
    return state.editingData ? model.updateEmail(state.editingData.id, value) : model.addEmail(value);
  }

  return useObserver(() => (
    <Form onSubmit={onSubmit}
          className={"email-container"}
          error={state.error}
    >
      <Message error
               content={errorMessage}
      />
      {model.emails.map(item => (
        <Form.Field key={item.id}>
          <Label className={"email-container__item"}
                 color={state.editingData && state.editingData.id === item.id ? "grey" : null}
          >
            <Icon name={"mail"}/>
            <span className={"email-container__email"}>{item.email}</span>
            {model.isEditMode ?
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
      {model.isEditMode ?
        <Form.Field id={elementId}
                    control={Input}
                    name={"email"}
                    placeholder={"E-mail"}
                    onClick={onClick}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={state.value}
                    fluid
        />
        :
        null
      }
    </Form>
  ));
}