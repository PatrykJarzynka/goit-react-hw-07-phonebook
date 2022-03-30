import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Test from './components/Test';
import { fetchAsync, selectContacts,postAsync } from './features2/contactsSlice';

function App() {
  const dispatch = useDispatch();
  const contact = useSelector(selectContacts)

  let test = {
    name: "asdas",
    phone: "123-123-123"
  }

  console.log(contact)
  return (
    <div className="App">
      <Test onClick={() => dispatch(fetchAsync())}></Test>
      <Test onClick={()=> dispatch(postAsync(test))}></Test>
      
    </div>
  );
}

export default App;
