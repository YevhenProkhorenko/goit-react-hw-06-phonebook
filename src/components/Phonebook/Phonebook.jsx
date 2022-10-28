import { useSelector, useDispatch } from 'react-redux';
import { removeContact, filterContacts } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import css from '../Phonebook/Phonebook.module.scss';

import React from 'react';

export default function Phonebook() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const addConctacts = data => {
    if (noDuplicates(data)) {
      return alert(`${data.name} is already in contacts.`);
    }
    dispatch(addContact({ id: nanoid(), ...data }));
  };

  const searchContact = e => {
    const { value } = e.target;
    dispatch(filterContacts(value));
  };

  const filteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normilizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact => {
      const normilizeName = contact.name.toLowerCase();

      const result = normilizeName.includes(normilizedFilter);

      return result;
    });
    return filteredContacts;
  };

  const noDuplicates = ({ name }) => {
    const result = contacts.find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    return result;
  };

  const deleteContact = id => {
    dispatch(removeContact(id));
  };

  const filteredContactsList = filteredContacts();
  return (
    <>
      <div className={css.mainWrapper}>
        <ContactForm onSubmit={addConctacts} />
      </div>
      <div>
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={searchContact}></Filter>
        <ContactList
          contacts={filteredContactsList}
          removeContact={deleteContact}
        />
      </div>
    </>
  );
}
