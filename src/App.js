import { useEffect, useState, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import List from './components/List';

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [meaningOfSearchTerm, setMeaningOfSearchTerm] = useState('');
  const [list, setList] = useState([]); //contains list of dictionary objects
  const [fromLanguage, setFromLanguage] = useState('fi');
  const [toLanguage, setToLanguage] = useState('en');
  const input = useRef();

  const options = [
    { value: 'fi', label: 'Finnish' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' }
  ]

  useEffect(() => {
    document.getElementById("google_translate_element").textContent = meaningOfSearchTerm;
  }, [meaningOfSearchTerm]);

  useEffect(() => {
    console.log(list);
  }, [list]);

  const updateLanguage = (fromto, language) => {
    if (fromto === 'from') {
      setFromLanguage (() => language)
     } else {setToLanguage (() => language)}
     console.log(fromto, language)
  }

  const handleSetSearchTerm = (e) => {
    setSearchTerm(() => {
      return e.target.value;
    });
  }

  const searchGoogleTranslate = async () => {
    const fetched = await fetch(`
      https://api.mymemory.translated.net/get?
      q=${searchTerm}!&
      langpair=${fromLanguage}|${toLanguage}`
    );
    const data = await fetched.json();
    const result = data.responseData.translatedText;
    setMeaningOfSearchTerm(() => {
      return result;
    });
  }

  const addToList = () => {
    if (searchTerm.length === 0) return notifyForSearchTerm();
    if (meaningOfSearchTerm.length === 0) return notifyForMeaning();
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

  const notifyForSearchTerm =() => {
    toast("At least give me something to search for!");
  }

  const notifyForMeaning = () => {
    toast("Do I conjure up the meaning on my own?");
  }

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="searchterm">
          <Form.Label>Search Term</Form.Label>
          <Form.Control value={searchTerm} type="text" placeholder="Payment" ref={input} onChange={handleSetSearchTerm} />
        </Form.Group>
      </Form>
      <div className='language-selection-boxes'>
        <Select className='language-selction-box' options={options} onChange={(e) => {
          updateLanguage('from', e.value)
        }} />
        <Select className='language-selction-box' options={options} onChange={(e) => {
          updateLanguage('to', e.value)
        }} />
      </div>
      <div id="google_translate_element"></div>
      <Button variant="outline-primary" onClick={searchGoogleTranslate}>Find Meaning</Button>{' '}
      <Button variant="outline-primary" onClick={addToList}>Add to List</Button>{' '}
      <ToastContainer
        position="top-left"
        theme="dark"
      />
      <List list={list} />
    </>
  )
}

export default App;
