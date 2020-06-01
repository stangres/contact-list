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
                  editMode
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
    editMode
  });

  useEffect(() => {
      if (!editMode) {
        setValue('');
        setEditingData(null);
      }
    }, [editMode, setValue, setEditingData]
  );

  function onChange(e) {
    setValue(e.target.value);
  }

  function onEdit(item) {
    setError(false);

    if (editingData && editingData[dataIdKey] === item[dataIdKey]) {
      setValue('');
      setEditingData(null);
      setIsActiveMode(false);
    }
    else {
      setValue(item[dataValueKey]);
      setEditingData(item);
      setIsActiveMode(true);
    }
  }

  async function onDelete(item) {
    const result = await deleteCb(item[dataIdKey]);
    setError(!result);

    if (result && editingData && editingData[dataIdKey] === item[dataIdKey]) {
      setValue('');
      setEditingData(null);
      setIsActiveMode(false);
    }
  }

  async function onSubmitInternal() {
    if (await onSubmit()) {
      setValue('');
      setEditingData(null);
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