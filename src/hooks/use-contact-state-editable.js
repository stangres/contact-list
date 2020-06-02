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

  const [editingData, setEditingData] = useState(null);
  const [value, setValue] = useState('');

  const {
    isActiveMode,
    setIsActiveMode,
    error,
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

  useEffect(() => {
      if (!isEditMode) {
        setValue('');
        setEditingData(null);
      }
    }, [isEditMode]
  );

  function onChange(e) {
    if (isEditMode) {
      setValue(e.target.value);
    }
  }

  function onEdit(item) {
    if (isEditMode) {
      setError(false);

      if (editingData && editingData[dataIdKey] === item[dataIdKey]) {
        setValue('');
        setEditingData(null);
        setIsActiveMode(false);
      } else {
        setValue(item[dataValueKey]);
        setEditingData(item);
        setIsActiveMode(true);
      }
    }
  }

  async function onDelete(item) {
    let result = false;

    if (isEditMode) {
      result = await deleteCb(item[dataIdKey]);
      setError(!result);

      if (result && editingData && editingData[dataIdKey] === item[dataIdKey]) {
        setValue('');
        setEditingData(null);
        setIsActiveMode(false);
      }
    }
  }

  async function onSubmitInternal() {
    if (isEditMode) {
      if (await onSubmit()) {
        setValue('');
        setEditingData(null);
      }
    }
  }

  // function onBlurInternal() {
  //   onBlur();
  //   setValue('');
  //   setEditingData(null);
  // }


  return {
    isActiveMode,
    setIsActiveMode,
    error,
    setError,
    onClick,
    onBlur,
    onSubmit: onSubmitInternal,

    onEdit,
    onDelete,
    onChange,
    editingData,
    setEditingData,
    value,
    setValue
  }
}