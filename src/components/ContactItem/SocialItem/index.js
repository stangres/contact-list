import React from 'react';
import { Form, Icon, Input, Label, Message } from 'semantic-ui-react';
import { useObserver } from 'mobx-react-lite';
import urlParse from 'url-parse';
import { useContactStateEditable } from '../../../hooks';
import { errorMessage } from '../item-error';
import './style.scss';

const snMap = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  linkedin: 'Linkedin',
  vkontakte: 'VK',
  vk: 'VK',
  'plus.google': 'Google+'
}

const snByUrl = (url) => {
  const hostname = urlParse(url).hostname;

  const s = hostname.replace("www.", "")
                    .replace(".com", "")
                    .replace(".org", "")
                    .replace(".ru", "");

  for (let key in snMap) {
    if (s.toLowerCase() === key) {
      return snMap[key];
    }
  }

  return url;
}

export default ({ model }) => {

  const elementId = "form-input-social-" + model.id;

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
    dataValueKey: 'url',
    deleteCb: model.deleteSocial,
    editMode: model.editMode
  });

  function validateOnSubmit(value) {
    return value !== '' && (!editingData || editingData.url !== value) ;
  }

  function submitCb(value) {
    return editingData ? model.updateSocial(editingData.id, value) : model.addSocial(value);
  }

  return useObserver(() => (
    <Form onSubmit={onSubmit}
          className={"social-net-container"}
          error={error}
    >
      <Message error
               content={errorMessage}
      />
      {model.socials.map(item => {
        const isEditing = editingData && editingData.id === item.id;
        const linkTextClass = isEditing ? " social-net-container__url_editing" : "";

        const snName = snByUrl(item.url);

        return (
          <Form.Field key={item.id}>
            <Label className={"social-net-container__item"}
                   color={isEditing ? "grey" : null}
            >
              <Icon name={"globe"}/>
              <span className={"social-net-container__url" + linkTextClass}>
                <a href={item.url}
                   target={"_blank"}
                   rel={"noopener noreferrer"}
                >
                  {snName}
                </a>
              </span>
              {model.editMode ?
                <span className={"social-net-container__tools"}>
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
          </Form.Field>
        )
        })
      }
      {model.editMode ?
        <Form.Field id={elementId}
                    control={Input}
                    name={"social"}
                    placeholder={"Соц. сеть"}
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