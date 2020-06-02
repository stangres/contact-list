import {useEffect, useState} from "react";
import { useContactState } from "../hooks";

export default ({ submitCb,
                  validateOnSubmit,
                  clearOnSubmit,
                  clearOnBlur,
                  elementId,
                  dataIdKey,
                  dataValueKey,
                  deleteCb,
                  isEditMode
                }) => {

  const {
    state: s,
    setIsActiveMode,
    //error,
    setError,
    onClick,
    onBlur,
    onSubmit
  } = useContactState({
    submitCb,
    validateOnSubmit,
    clearOnSubmit,
    clearOnBlur,
    elementId,
    isEditMode
  });

  const [state, setState] = useState({ ...s, editingData: null, value: '' });

  useEffect(() => {
      if (!isEditMode) {
        setState(state => ({ ...state, editingData: null, value: '' }));
      }
    }, [isEditMode]
  );

  function setEditingData(data) {
    setState(state => ({ ...state, editingData: data }));
  }

  function setValue(value) {
    setState(state => ({ ...state, value }));
  }

  function onChange(e) {
    if (isEditMode) {
      setValue(e.target.value);
    }
  }

  function onEdit(item) {
    if (isEditMode) {
      let error = false,
          value = '',
          editingData = null,
          isActiveMode = false;

      if (!state.editingData || state.editingData[dataIdKey] !== item[dataIdKey]) {
        value = item[dataValueKey];
        editingData = item;
        isActiveMode = true;
      }

      setState(state => ({ ...state, error, value, editingData, isActiveMode }));
    }
  }

  async function onDelete(item) {
    let result = false;

    if (isEditMode) {
      result = await deleteCb(item[dataIdKey]);

      let error = !result,
          value = state.value,
          editingData = state.editingData,
          isActiveMode = state.isActiveMode;

      if (result && editingData && editingData[dataIdKey] === item[dataIdKey]) {
        value = '';
        editingData = null;
        isActiveMode = false;
      }

      setState(state => ({ ...state, error, value, editingData, isActiveMode }));
    }

    return result;
  }

  async function onSubmitInternal() {
    if (isEditMode) {
      if (await onSubmit()) {
        setState(state => ({ ...state, editingData: null, value: '' }));
      }
    }
  }

  return {
    state,
    setIsActiveMode,
    setError,
    onClick,
    onBlur,
    onSubmit: onSubmitInternal,

    onEdit,
    onDelete,
    onChange,
    setEditingData,
    setValue
  }
}