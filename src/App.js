import { useState, useEffect } from 'react';
import s from './App.module.css';
import { v4 as uuidv4 } from 'uuid';
import ContactList from './components/ContactList';
import ContactsForm from './components/ContactsForm';
import Filter from './components/Filter';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      return alert(`${name} is already in contacts`);
    } else {
      const contact = {
        id: uuidv4(),
        name,
        number,
      };
      setContacts(contacts => [...contacts, contact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>

      <ContactsForm onSubmit={addContact} />

      <h2 className={s.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
