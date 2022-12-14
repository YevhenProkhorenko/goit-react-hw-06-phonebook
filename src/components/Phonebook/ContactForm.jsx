import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from '../Phonebook/Phonebook.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const noDuplicates = ({ name }) => {
    const result = contacts.find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    return result;
  };

  const addConctacts = data => {
    if (noDuplicates(data)) {
      return alert(`${data.name} is already in contacts.`);
    }
    dispatch(addContact({ id: nanoid(), ...data })) && setName('');
    setNumber('');;
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    addConctacts({ name, number });
    
  };

  return (
    <form className={css.formFlex} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId} className={css.labelText}>
        Name
      </label>
      <input
        className={css.inputStyles}
        id={nameInputId}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />
      <div className={css.formFlex}>
        <label htmlFor={numberInputId} className={css.labelText}>
          Number
        </label>
        <input
          className={css.inputStyles}
          id={numberInputId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={css.submitButton}>
        Add contact
      </button>
    </form>
  );
}
