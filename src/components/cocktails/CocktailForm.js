import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function CocktailForm(props) {
  const [formMsg, setFormMsg] = useState('');
  const { success, msg } = formMsg;
  const { cocktail, liquorData, mixerData, garnishData, glassData, toggle } = props;

  const initialValues = {
    name: cocktail.name,
    liquor: cocktail.liquor,
    mixers: cocktail.mixers,
    garnish: cocktail.garnish,
    glassType: cocktail.glassType,
  };

  const onSubmit = values => {
    const cocktailURI = `http://localhost:5000/api/cocktails/${cocktail.id}`;
    fetch(cocktailURI, {
      method: 'PUT',
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

  const liquorTypes = [...new Set(liquorData.map(oneLiquor => oneLiquor.type))];
  const mixerTypes = [...new Set(mixerData.map(mixer => mixer.type))];

  const gettingCategory = value => {
    let allLiquors = [];
    liquorData.map(oneLiquor => {
      if (oneLiquor.type === value) {
        allLiquors.push(oneLiquor);
      }
      const categorys = [...new Set(allLiquors.map(l => l.category))];
      console.log(categorys);
      return categorys;
    });
  };

  const deleteHandler = () => {
    const cocktailURI = `http://localhost:5000/api/cocktails/${cocktail.id}`;
    fetch(cocktailURI, {
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
    <div style={addCocktailContainer}>
      <h1>{cocktail.name}</h1>

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
            <label htmlFor='name' style={cocktailLabel}>
              Name
            </label>
            <Field type='text' name='name' id='name' style={cocktailFieldStyle} />
            <ErrorMessage name='name' />
          </div>

          <div>
            <label htmlFor='glass' style={cocktailLabel}>
              What glass do you want to use?
            </label>
            <Field as='select' name='glassType' id='glass' style={cocktailFieldStyle}>
              {glassData.map((glass, index) => (
                <option key={index}>{glass.type}</option>
              ))}
            </Field>
          </div>

          {/* LIQUOR **************************************** */}
          <div>
            <h3>Liquor</h3>
            <FieldArray name='liquor'>
              {props => {
                const { form, push, remove } = props;
                const { values } = form;
                const { liquor } = values;

                return (
                  <div>
                    {liquor.map((oneLiquor, index) => (
                      <div key={index} style={box}>
                        <div>
                          <label htmlFor='type' style={label}>
                            Type
                          </label>
                          <Field
                            as='select'
                            name={`liquor[${index}].type`}
                            id='type'
                            style={fieldStyle}
                          >
                            {liquorTypes.map((type, i) => (
                              <option key={i}>{type}</option>
                            ))}
                          </Field>
                        </div>

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
                            {liquorData.map((singleLiquor, i) =>
                              singleLiquor.type === oneLiquor.type ? (
                                <option key={i}>{singleLiquor.category}</option>
                              ) : null
                            )}

                            {/* {async () => {
                              const cats = await gettingCategory(oneLiquor.type);
                              cats.map((cat, i) => <option key={i}>{cat}</option>);
                            }} */}
                          </Field>
                        </div>

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
                            {liquorData.map((singleLiquor, i) =>
                              singleLiquor.type === oneLiquor.type &&
                              singleLiquor.category === oneLiquor.category ? (
                                <option key={i}>{singleLiquor.name}</option>
                              ) : null
                            )}
                          </Field>
                        </div>

                        <div>
                          <label htmlFor='quantity'>Quantity</label>
                          <Field
                            as='select'
                            name={`liquor[${index}].quantity`}
                            id='quantity'
                            style={fieldStyle}
                          >
                            <option key='0'>1</option>
                            <option key='1'>2</option>
                            <option key='2'>3</option>
                            <option key='3'>4</option>
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

          {/* MIXERS ********************************************** */}
          <div>
            <FieldArray name='mixers'>
              {props => {
                const { form, push, remove } = props;
                const { values } = form;
                const { mixers } = values;

                return (
                  <div>
                    <h3>Mixers</h3>
                    {mixers.map((mixer, index) => (
                      <div key={index} style={box}>
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
                            {mixerTypes.map((type, i) => (
                              <option key={i}>{type}</option>
                            ))}
                          </Field>
                        </div>

                        <div>
                          <label htmlFor='category' style={label}>
                            Category
                          </label>
                          <Field
                            as='select'
                            name={`mixers[${index}].category`}
                            style={fieldStyle}
                          >
                            {mixerData.map((oneMixer, i) => {
                              return oneMixer.type === mixer.type ? (
                                <option key={i}>{oneMixer.category}</option>
                              ) : null;
                            })}
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
                            <option key='0'>1</option>
                            <option key='1'>2</option>
                            <option key='2'>3</option>
                            <option key='3'>4</option>
                            <option key='4'>5</option>
                            <option key='5'>6</option>
                            <option key='6'>7</option>
                            <option key='7'>8</option>
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

          {/* GARNISH ****************************  */}
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
            <button type='button' onClick={deleteHandler} style={deleteBtn}>
              Delete
            </button>
            <button type='submit' style={submitBtn}>
              Submit
            </button>
            <button type='button' onClick={toggle} style={hideBtn}>
              hide
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
  marginRight: '10px',
  marginBottom: '20px',
};

const hideBtn = {
  width: '70px',
  padding: '8px',
  marginRight: '30px',
};

const deleteBtn = {
  width: '70px',
  padding: '8px',
  color: 'red',
  marginRight: '10px',
  marginBottom: '20px',
};
