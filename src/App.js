import { useEffect, useState, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [meaningOfSearchTerm, setMeaningOfSearchTerm] = useState('');
  const [list, setList] = useState([]); //contains list of dictionary objects
  const input = useRef();

  useEffect(() => {
    document.getElementById("google_translate_element").textContent = meaningOfSearchTerm;
  }, [meaningOfSearchTerm]);

  useEffect(() => {
    console.log(list);
  }, [list]);

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
    if (meaningOfSearchTerm.length === 0) return notify();
    setList(() => {
      return [...list, {searchTerm, meaningOfSearchTerm}];
    });
    setSearchTerm(() => {
      return "";
    });
    setMeaningOfSearchTerm(() => {
      return "";
    })
  }

  const notify = () => {
    toast("First search for the meaning!");
  }

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="searchterm">
          <Form.Label>Search Term</Form.Label>
          <Form.Control value={searchTerm} type="text" placeholder="Payment" ref={input} onChange={handleSetSearchTerm} />
        </Form.Group>
      </Form>
      <div id="google_translate_element"></div>
      <Button variant="outline-primary" onClick={searchGoogleTranslate}>Find Meaning</Button>{' '}
      <Button variant="outline-primary" onClick={addToList}>Add to List</Button>{' '}
      <ToastContainer
        position="top-left"
        theme="dark"
        type = "error"
      />
    </>
  )
}

export default App;
