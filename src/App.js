import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import List from "./components/List";

const localStorageListDataKey = "listData";

const App = () => {
  const listFromLocalStorage = !localStorage.getItem(localStorageListDataKey)
    ? []
    : JSON.parse(localStorage.getItem(localStorageListDataKey));
  console.log(listFromLocalStorage);

  const [searchTerm, setSearchTerm] = useState("");
  const [meaningOfSearchTerm, setMeaningOfSearchTerm] = useState("");
  const [list, setList] = useState(listFromLocalStorage); //contains list of dictionary objects
  const [fromLanguage, setFromLanguage] = useState("fi");
  const [toLanguage, setToLanguage] = useState("en");

  const options = [
    { value: "fi", label: "Finnish" },
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
  ];

  useEffect(() => {
    document.getElementById("translate_element").textContent =
      meaningOfSearchTerm;
  }, [meaningOfSearchTerm]);

  // save dataset to local storage
  useEffect(() => {
    localStorage.setItem("listData", JSON.stringify(list));
  }, [list]);

  const handleSetSearchTerm = (e) => {
    setSearchTerm(() => {
      return e.target.value;
    });
  };

  const updateLanguage = (fromOrTo, language) => {
    if (fromOrTo === "from") {
      setFromLanguage(() => language);
    } else {
      setToLanguage(() => language);
    }
  };

  const searchGoogleTranslate = async () => {
    if (!searchTerm) return notifyForSearchTerm();
    const fetched = await fetch(`
      https://api.mymemory.translated.net/get?
      q=${searchTerm}!&
      langpair=${fromLanguage}|${toLanguage}`);
    const data = await fetched.json();
    const result = data.responseData.translatedText;
    setMeaningOfSearchTerm(() => {
      return result;
    });
  };

  const addToList = () => {
    if (meaningOfSearchTerm.length === 0) return notifyForMeaning();
    if (!list) {
      setList(() => {
        return [{ searchTerm, meaningOfSearchTerm }];
      });
    } else {
      setList(() => {
        return [...list, { searchTerm, meaningOfSearchTerm }];
      });
    }
    setSearchTerm(() => {
      return "";
    });
    setMeaningOfSearchTerm(() => {
      return "";
    });
  };

  const clearList = () => {
    setList(() => []);
    localStorage.removeItem(localStorageListDataKey);
  };

  const notifyForSearchTerm = () => {
    toast("At least give me something to search for!");
  };

  const notifyForMeaning = () => {
    toast("Do I conjure up the meaning of something imaginary?");
  };

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="searchterm">
          <Form.Label>Search Term</Form.Label>
          <Form.Control
            value={searchTerm}
            type="text"
            placeholder="Search Term"
            onChange={handleSetSearchTerm}
          />
        </Form.Group>
      </Form>
      <div className="language-selection-boxes">
        <Select
          className="language-selction-box"
          options={options}
          onChange={(e) => {
            updateLanguage("from", e.value);
          }}
        />
        <Select
          className="language-selction-box"
          options={options}
          onChange={(e) => {
            updateLanguage("to", e.value);
          }}
        />
      </div>
      <div id="translate_element"></div>
      <Button variant="outline-primary" onClick={searchGoogleTranslate}>
        Find Meaning
      </Button>{" "}
      <Button variant="outline-primary" onClick={addToList}>
        Add to List
      </Button>{" "}
      <Button variant="outline-primary" onClick={clearList}>
        Clear List
      </Button>{" "}
      <ToastContainer position="top-left" theme="dark" />
      <List list={list} />
    </>
  );
};

export default App;
