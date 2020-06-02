import React from 'react';
import { Form, Icon, Input, Label, Message } from "semantic-ui-react";
import { useObserver } from 'mobx-react-lite'
import { useContactStateEditable } from '../../../hooks';
import { errorMessage } from '../item-error';
import './style.scss';

export default ({ model }) => {

  const elementId = "form-input-phone-" + model.id;

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
    dataValueKey: 'phone',
    deleteCb: model.deletePhone,
    isEditMode: model.isEditMode
  });

  function validateOnSubmit(value) {
    return value !== '' && (!editingData || editingData.phone !== value) ;
  }

  function submitCb(value) {
    return editingData ? model.updatePhone(editingData.id, value) : model.addPhone(value);
  }

  return useObserver(() => (
    <Form onSubmit={onSubmit}
          className={"phone-container"}
          error={error}
    >
      <Message error
               content={errorMessage}
      />
      {model.phones.map(item => (
        <Form.Field key={item.id}>
          <Label className={"phone-container__item"}
                 color={editingData && editingData.id === item.id ? "grey" : null}
          >
            <Icon name={"phone"}/>
            <span className={"phone-container__phone"}>{item.phone}</span>
            {model.isEditMode ?
              <span className={"phone-container__tools"}>
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
                    name={"phone"}
                    placeholder={"Телефон"}
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
};