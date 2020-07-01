import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function AddLiquor() {
  const [formMsg, setFormMsg] = useState('');
  const { msg, success } = formMsg;

  const initialValues = {
    type: '',
    name: '',
    category: '',
    abv: '',
    quantity: '',
  };

  const onSubmit = values => {
    if (!values.category) {
      values.category = 'Regular';
    }
    console.log('Form Data', values);
    const liquorURI = 'http://localhost:5000/api/liquor';
    fetch(liquorURI, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(data => {
        setFormMsg({
          success: data.success,
          msg: data.msg,
        });
      });
  };

  const validationSchema = Yup.object({
    type: Yup.string().required('Required'),
  });

  return (
    <div style={formStyle}>
      {msg ? (
        <h2 className='response-messages' style={{ color: success ? 'green' : 'red' }}>
          {msg}
        </h2>
      ) : null}

      <h3 style={addLiquorheading}>Adding a new Liquor</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div>
            <label htmlFor='type' style={label}>
              Type
            </label>
            <Field name='type' id='type' type='text' style={input} />
            <ErrorMessage name='type' />
          </div>

          <div>
            <label htmlFor='name' style={label}>
              Name
            </label>
            <Field name='name' id='name' type='text' style={input} />
            <ErrorMessage name='name' />
          </div>

          <div>
            <label htmlFor='category' style={label}>
              Category
            </label>
            <Field name='category' id='category' type='text' style={input} />
            <ErrorMessage name='category' />
          </div>

          <div>
            <label htmlFor='abv' style={label}>
              ABV
            </label>
            <Field name='abv' id='abv' type='number' style={input} />
            <ErrorMessage name='abv' />
          </div>

          <div>
            <label htmlFor='quantity' style={label}>
              Quantity
            </label>
            <Field name='quantity' id='quantity' type='number' style={input} />
            <ErrorMessage name='quantity' />
          </div>

          <div style={btnDiv}>
            <button type='submit' style={btn}>
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

const addLiquorheading = {
  margin: '10px 0  20px 30px',
};

const formStyle = {
  margin: '20px 0 10px 30px',
  padding: '20px 0 10px 10px',
  border: '1px solid black',
  borderRadius: '5px',
  width: '400px',
};

const label = {
  margin: '0 20px 20px 30px',
};

const input = {
  display: 'block',
  margin: '10px 20px 10px 30px',
  lineHeight: '1.4',
  width: '200px',
  color: '#555',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const btnDiv = {
  textAlign: 'right',
};

const btn = {
  marginRight: '30px',
  width: '70px',
  padding: '5px',
};
