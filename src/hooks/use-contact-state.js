import { useState, useEffect, useRef } from 'react';

const moveCursorToEnd = (el) => {
  if (typeof el.selectionStart == "number") {
    el.selectionStart = el.selectionEnd = el.value.length;
  } else if (typeof el.createTextRange != "undefined") {
    el.focus();
    const range = el.createTextRange();
    range.collapse(false);
    range.select();
  }
}

export default ({ submitCb,
                  validateOnSubmit,
                  clearOnSubmit,
                  clearOnBlur,
                  elementId,
                  isEditMode
                }) => {

  const inputElRef = useRef();

  const [isActiveMode, setIsActiveMode] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    inputElRef.current = document.getElementById(elementId);

    if (isEditMode && isActiveMode && inputElRef.current) {
      inputElRef.current.focus();
      moveCursorToEnd(inputElRef.current);
    }
  }, [isEditMode, isActiveMode, elementId]);

  useEffect(() => {
    if (!isEditMode) {
      setError(false);
      setIsActiveMode(false);
    }
  }, [isEditMode]);

  function onClick() {
    if (isEditMode) {
      setError(false);
      setIsActiveMode(true);
    }
  }

  function onBlur() {
    if (isEditMode) {
      if (clearOnBlur) {
        inputElRef.current.value = '';
      }

      setError(false);
      setIsActiveMode(false);
    }
  }

  async function onSubmit() {
    let result = false;

    if (isEditMode) {
      const value = inputElRef.current.value;

      if (!validateOnSubmit || validateOnSubmit(value)) {
        result = await submitCb(value);
        setError(!result);

        if (result) {
          if (clearOnSubmit) {
            inputElRef.current.value = '';
          }
          setIsActiveMode(false);
        }
      }
    }

    return result;
  }

  return {
    isActiveMode,
    setIsActiveMode,
    error,
    setError,
    onClick,
    onBlur,
    onSubmit,
  }
}