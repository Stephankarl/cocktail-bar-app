import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function LiquorForm(props) {
  const { liquor, toggler } = props;
  const [formMsg, setFormMsg] = useState('');
  const { success, msg } = formMsg;

  const initialValues = {
    type: liquor.type,
    name: liquor.name,
    category: liquor.category || 'Reqular',
    abv: liquor.abv,
    quantity: liquor.quantity,
  };

  const onSubmit = values => {
    const liquorURI = `http://localhost:5000/api/liquor/${liquor.id}`;
    fetch(liquorURI, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(data =>
        setFormMsg({
          success: data.success,
          msg: data.msg,
        })
      );
  };

  const validationSchema = Yup.object({
    type: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    abv: Yup.string().required('Required'),
    quantity: Yup.string().required('Required'),
  });

  const deleteHandler = () => {
    const liquorURI = `http://localhost:5000/api/liquor/${liquor.id}`;
    fetch(liquorURI, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'content-type': 'applicaton/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setFormMsg({
          success: data.success,
          msg: data.msg,
        });
      });
  };

  return (
    <div style={formStyle}>
      <div>
        <h2 style={editHeading}>Edit {liquor.name}</h2>
      </div>
      <div style={succesMsg}>
        {msg ? <h2 style={{ color: success ? 'green' : 'red' }}>{msg}</h2> : null}
      </div>

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
            <button type='button' onClick={toggler} style={btn}>
              less
            </button>
            <button
              type='button'
              onClick={deleteHandler}
              style={btn}
              className='delete-btn'
            >
              Delete
            </button>
            <button type='submit' style={btn}>
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

const editHeading = {
  margin: '10px 60px',
};

const succesMsg = {
  margin: '10px 60px',
};

const formStyle = {
  margin: '20px 0',
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
  margin: '10px 10px 10px 0',
  width: '70px',
  padding: '5px',
};
