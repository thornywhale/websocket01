import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { authUser } from '../../../store/userSlice';

const UserForm = () => {
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    dispatch(authUser(values));
    formikBag.resetForm();
  };
  return (
    <Formik initialValues={{ login: '', email: '' }} onSubmit={onSubmit}>
      <Form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <label>
          <span>login: </span>
          <Field name="login" />
          <ErrorMessage name="login" />
        </label>
        <label>
          <span>email: </span>
          <Field type="email" name="email" />
          <ErrorMessage name="email" />
        </label>
        <button type="submit">log in</button>
      </Form>
    </Formik>
  );
};

export default UserForm;
