import React, { useState } from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function AddCocktail(props) {
  const [formMsg, setFormMsg] = useState('');
  const { success, msg } = formMsg;
  const { liquorData, mixersData, glassData, garnishData } = props;
  const initialValues = {
    name: '',
    glassType: '',
    liquor: [{}],
    mixers: [{}],
    garnish: '',
  };

  const onSubmit = values => {
    const cocktailURI = 'http://localhost:5000/api/cocktails';
    fetch(cocktailURI, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
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
    name: Yup.string().required('Required'),
  });

  const liquorTypes = [...new Set(liquorData.map(liquor => liquor.type))];
  const mixerTypes = [...new Set(mixersData.map(mixer => mixer.type))];

  return (
    <div style={addCocktailContainer}>
      <h2>Adding a Cocktail</h2>

      <div style={succesMsg}>
        {msg ? <h2 style={{ color: success ? 'green' : 'red' }}>{msg}</h2> : null}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          {/* COCKTAIL NAME  */}
          <div>
            <label htmlFor='name' style={cocktailLabel}>
              Name of Cocktail
            </label>
            <Field type='text' name='name' id='name' style={cocktailFieldStyle} />
            <ErrorMessage name='name' />
          </div>

          {/* TYPE OF GLASS  */}
          <div>
            <label htmlFor='glass' style={cocktailLabel}>
              What glass do you want to use?
            </label>
            <Field as='select' name='glassType' id='glass' style={cocktailFieldStyle}>
              <option defaultValue=''>Choose one</option>
              {glassData.map((glass, index) => (
                <option key={index}>{glass.type}</option>
              ))}
            </Field>
          </div>

          {/* ******************************************************************** */}
          {/* ADD LIQUOR  */}
          <div style={addContainer}>
            <FieldArray name='liquor'>
              {props => {
                // console.log(props);
                const { form, push, remove } = props;
                const { values } = form;
                const { liquor } = values;

                return (
                  <div>
                    <h3>Liquor</h3>
                    {liquor.map((oneLiquor, index) => (
                      <div key={index} style={box}>
                        {/* LIQUOR TYPE FIELD  */}
                        <div>
                          <label htmlFor='type' style={label}>
                            Type
                          </label>

                          <Field
                            as='select'
                            name={`liquor[${index}].type`}
                            style={fieldStyle}
                          >
                            <option defaultValue=''>Choose One</option>
                            {liquorTypes.map((type, i) => (
                              <option key={i}>{type}</option>
                            ))}
                          </Field>
                        </div>

                        {/* LIQUOR CATEGORY FIELD  */}
                        <div>
                          <label htmlFor='category' style={label}>
                            Category
                          </label>
                          <Field
                            as='select'
                            name={`liquor[${index}].category`}
                            id='category'
                            style={fieldStyle}
                          >
                            <option defaultValue=''>Choose One</option>
                            {liquorData.map((singleLiquorOfAll, i) =>
                              singleLiquorOfAll.type === oneLiquor.type ? (
                                <option key={i}>{singleLiquorOfAll.category}</option>
                              ) : null
                            )}
                          </Field>
                        </div>

                        {/* LIQUOR NAME FIELD  */}
                        <div>
                          <label htmlFor='name' style={label}>
                            Name
                          </label>

                          <Field
                            as='select'
                            name={`liquor[${index}].name`}
                            id='name'
                            style={fieldStyle}
                          >
                            <option defaultValue=''>Choose One</option>
                            {liquorData.map((singleLiquorOfAll, i) =>
                              singleLiquorOfAll.category === oneLiquor.category &&
                              singleLiquorOfAll.type === oneLiquor.type ? (
                                <option key={i}>{singleLiquorOfAll.name}</option>
                              ) : null
                            )}
                          </Field>
                        </div>

                        {/* QUANTITY OF LIQUOR  */}
                        <div>
                          <label htmlFor='quantity' style={label}>
                            Quantity in shots
                          </label>
                          <Field
                            as='select'
                            name={`liquor[${index}].quantity`}
                            id='quantity'
                            defaultValue='0'
                            style={fieldStyle}
                          >
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                          </Field>
                        </div>
                        <div style={btn}>
                          <button type='button' onClick={() => push({})}>
                            +
                          </button>
                          <button type='button' onClick={() => remove(index)}>
                            -
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </div>

          {/* ******************************************************************** */}
          {/* ADD MIXERS  */}
          <div>
            <FieldArray name='mixers'>
              {props => {
                const { form, push, remove } = props;
                const { values } = form;
                const { mixers } = values;

                return (
                  <div style={addContainer}>
                    <h3>Mixers</h3>
                    {mixers.map((mixer, index) => (
                      <div key={index} style={box}>
                        {/* MIXER TYPE FIELD  */}
                        <div>
                          <label htmlFor='type' style={label}>
                            Type
                          </label>
                          <Field
                            as='select'
                            name={`mixers[${index}].type`}
                            id='type'
                            style={fieldStyle}
                          >
                            <option defaultValue=''>Choose One</option>
                            {mixerTypes.map((type, i) => (
                              <option key={i}>{type}</option>
                            ))}
                          </Field>
                        </div>

                        {/* MIXER CATEGORY FIELD  */}
                        <div>
                          <label htmlFor='category' style={label}>
                            Category
                          </label>
                          <Field
                            as='select'
                            name={`mixers[${index}].category`}
                            id='category'
                            style={fieldStyle}
                          >
                            <option defaultValue=''>Choose One</option>
                            {mixersData.map((oneMixer, i) =>
                              oneMixer.type === mixer.type ? (
                                <option key={i}>{oneMixer.category}</option>
                              ) : null
                            )}
                          </Field>
                        </div>

                        <div>
                          <label htmlFor='quantity' style={label}>
                            Quantity
                          </label>
                          <Field
                            as='select'
                            name={`mixers[${index}].quantity`}
                            id='quantity'
                            style={fieldStyle}
                          >
                            <option key='0'>0</option>
                            <option key='1'>1</option>
                            <option key='2'>2</option>
                            <option key='3'>3</option>
                            <option key='4'>4</option>
                            <option key='5'>5</option>
                          </Field>
                        </div>
                        <div style={btn}>
                          <button type='button' onClick={() => push({})}>
                            +
                          </button>
                          <button type='button' onClick={() => remove(index)}>
                            -
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </div>

          {/* GARNISH ************************************** */}
          <div>
            <label htmlFor='garnish' style={cocktailLabel}>
              Garnish
            </label>
            <Field as='select' name='garnish' id='garnish' style={cocktailFieldStyle}>
              <option defaultValue=''>Choose one</option>
              {garnishData.map((garnish, index) => (
                <option key={index}>{garnish.type}</option>
              ))}
            </Field>
          </div>
          <div style={btn}>
            <button type='submit' style={submitBtn}>
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

const succesMsg = {
  margin: '10px 60px',
};

const addCocktailContainer = {
  marginLeft: '20px',
};

const addContainer = {
  marginLeft: '10px',
};

const cocktailLabel = {
  marginLeft: '20px',
};

const cocktailFieldStyle = {
  display: 'block',
  width: '300px',
  lineHeight: '1.4',
  margin: '10px 0 20px 30px',
};

const box = {
  display: 'inline-block',
  marginRight: '20px',
  marginBottom: '20px',
  padding: '8px',
  border: '1px solid black',
  borderRadius: '5px',
};

const fieldStyle = {
  marginBottom: '10px',
};

const label = {
  marginRight: '10px',
};

const btn = {
  textAlign: 'right',
};

const submitBtn = {
  width: '70px',
  padding: '8px',
  color: 'green',
  marginRight: '30px',
};
