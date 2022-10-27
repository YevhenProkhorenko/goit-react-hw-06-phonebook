import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import css from '../Phonebook/Phonebook.module.scss';

import React from 'react';

export default function Phonebook() {
  const [contacts, setContacts] = useState(() => {
    const value = JSON.parse(localStorage.getItem('contacts'));
    return value ?? [];
  });
  const [filter, setFilter] = useState('');
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addConctact = data => {
    if (noDuplicates(data)) {
      return alert(`${data.name} is already in contacts.`);
    }
    setContacts(prevState => {
      const newContact = { id: nanoid(), ...data };

      return [...prevState, newContact];
    });
  };

  const searchContact = e => {
    const { value } = e.target;
    setFilter(value);
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

  const removeContact = id => {
    setContacts(prevState => {
      const newContacts = prevState.filter(item => item.id !== id);
      return newContacts;
    });
  };

  const filteredContactsList = filteredContacts();
  return (
    <>
      <div className={css.mainWrapper}>
        <ContactForm onSubmit={addConctact} />
      </div>
      <div>
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={searchContact}></Filter>
        <ContactList
          contacts={filteredContactsList}
          removeContact={removeContact}
        />
      </div>
    </>
  );
}
