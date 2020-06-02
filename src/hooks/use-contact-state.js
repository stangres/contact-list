import { useState, useEffect, useRef } from 'react';

export default ({ submitCb,
                  validateOnSubmit,
                  clearOnSubmit,
                  clearOnBlur,
                  elementId,
                  isEditMode
                }) => {

  const inputElRef = useRef();

  const [state, setState] = useState({ isActiveMode: false, error: false });

  useEffect(() => {
    inputElRef.current = document.getElementById(elementId);

    if (isEditMode && state.isActiveMode && inputElRef.current) {
      inputElRef.current.focus();
    }
  }, [isEditMode, state.isActiveMode, elementId]);

  useEffect(() => {
    if (!isEditMode) {
      setState(state => ({ ...state, isActiveMode: false, error: false }));
    }
  }, [isEditMode]);

  function setIsActiveMode(flag) {
    setState(state => ({ ...state, isActiveMode: flag }));
  }

  function setError(flag) {
    setState(state => ({ ...state, error: flag }));
  }

  function inputElementRef() {
    return inputElRef;
  }

  function onClick() {
    if (isEditMode) {
      setState(state => ({ ...state, isActiveMode: true, error: false }));
    }
  }

  function onBlur() {
    if (isEditMode) {
      if (clearOnBlur) {
        inputElRef.current.value = '';
      }

      setState(state => ({ ...state, isActiveMode: false, error: false }));
    }
  }

  async function onSubmit() {
    let result = false;

    if (isEditMode) {
      const value = inputElRef.current.value;

      if (!validateOnSubmit || validateOnSubmit(value)) {
        result = await submitCb(value);

        let error = !result,
            isActiveMode = state.isActiveMode;

        if (result) {
          if (clearOnSubmit) {
            inputElRef.current.value = '';
          }

          isActiveMode = false;
        }

        setState(state => ({ ...state, isActiveMode, error }));
      }
    }

    return result;
  }

  return {
    state,
    setIsActiveMode,
    setError,
    onClick,
    onBlur,
    onSubmit,
    inputElementRef
  }
}