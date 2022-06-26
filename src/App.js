import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [meaningOfSearchTerm, setMeaningOfSearchTerm] = useState('');

  useEffect(() => {
    document.getElementById("google_translate_element").textContent = meaningOfSearchTerm;
  }, [meaningOfSearchTerm]);

  const handleSetSearchTerm = (e) => {
    setSearchTerm(() => {
      return e.target.value;
    });
  }

  const searchGoogleTranslate = () => {
    setMeaningOfSearchTerm(() => {
      return searchTerm;
    });
  }

  const addToList = () => {

  }

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="searchterm">
          <Form.Label>Search Term</Form.Label>
          <Form.Control type="text" placeholder="Payment" onChange={handleSetSearchTerm} />
        </Form.Group>
      </Form>
      <div id="google_translate_element"></div>
      <Button variant="outline-primary" onClick={searchGoogleTranslate}>Find Meaning</Button>{' '}
      <Button variant="outline-primary" onClick={addToList}>Add to List</Button>{' '}
    </>
  )
}

export default App;
