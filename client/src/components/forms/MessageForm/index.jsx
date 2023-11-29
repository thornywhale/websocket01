import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createMessage } from '../../../api';

const MessageForm = () => {
  const { user } = useSelector((store) => store.user);
  const onSubmit = (values, formikBag) => {
    values.userId = user?.id;
    createMessage(values);
    formikBag.resetForm();
  };
  return (
    <Formik initialValues={{ content: '' }} onSubmit={onSubmit}>
      <Form>
        <label>
          <Field name="content" />
          <ErrorMessage name="content" />
        </label>
        <button type="submit">send</button>
      </Form>
    </Formik>
  );
};

export default MessageForm;