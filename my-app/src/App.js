import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import { nanoid } from 'nanoid';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsync,
  selectContacts,
  postAsync,
  deleteAsync,
  selectFilter,
  filterContacts,
} from './features/contactsSlice';
import { useEffect } from 'react';

const StyledHeader = styled.h1({
  marginLeft: 5,
});

function App() {
  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchAsync());
    return () => {
      abortController.abort();
    };
  }, []);

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const deleteContact = id => {
    dispatch(deleteAsync(id));
  };

  const addContact = (name, number) => {
    const contact = { name: name, phone: number, id: nanoid() };
    debugger;
    const foundContant = contacts.find(contact => contact.name === name);
    if (foundContant) {
      alert(name + ' is already in contacts');
      return;
    }
    dispatch(postAsync(contact));
  };

  const handleFilter = event => {
    const value = event.target.value;
    if (event.target.name === 'filter') dispatch(filterContacts(value));
  };

  return (
    <div>
      <StyledHeader>Phonebook</StyledHeader>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilter} filter={handleFilter} />
      <ContactList list={contacts} onClick={deleteContact} filter={filter} />
    </div>
  );
}

export default App;
