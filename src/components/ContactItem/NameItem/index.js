import React, { useEffect } from 'react';
import {Form, Input, Message} from 'semantic-ui-react';
import { useObserver } from 'mobx-react-lite';
import { useContactState } from '../../../hooks';
import { errorMessage } from '../item-error';
import './style.scss';

export default ({ model }) => {
  const elementId = "form-input-name-" + model.id;

  const {
    state,
    setIsActiveMode,
    onClick,
    onBlur,
    onSubmit
  } = useContactState({
    submitCb: model.nameItem.id ? model.updateName : model.addName,
    validateOnSubmit,
    elementId,
    isEditMode: model.isEditMode
  });

  useEffect(() => {
    if (!model.nameItem.id) {
      setIsActiveMode(true);
    }
  }, [model.nameItem.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function validateOnSubmit(value) {
    return value !== '' && model.nameItem.name !== value;
  }

  return useObserver(() => {
    return (
      model.isEditMode && state.isActiveMode ?
      <Form onSubmit={onSubmit}
            error={state.error}
      >
        <Message error
                 content={errorMessage}
        />
        <Form.Field id={elementId}
                    control={Input}
                    name={"name"}
                    placeholder={"Имя"}
                    defaultValue={model.nameItem.name}
                    onBlur={onBlur}
                    fluid
        />
      </Form>
      :
      <div className={"contact-item__text"}
           onClick={onClick}
           title={model.isEditMode ? "Нажмите для изменения" : null}
      >
        <span>{model.nameItem.name}</span>
      </div>
    )
  });
};