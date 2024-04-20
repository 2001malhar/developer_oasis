import React from "react";
import { useState, useEffect } from "react";
import Header from "./header";
import Main from "./main";
import RegisterComponent from "../components/register/index"
import LoginComponent from "./main/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuthToken from '../checkingToken';

export default function FakeStackOverflow() {
  const [search, setSearch] = useState("");
  const [mainTitle, setMainTitle] = useState("All Questions");

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useAuthToken();

  const setQuesitonPage = (search = "", title = "All Questions") => {
    setSearch(search);
    setMainTitle(title);
  };
  return (
      <Router>
        { token ?
        <Routes> 
          <Route path = "/" exact element = {<HomePage mainTitle={mainTitle}
           search={search} setQuesitonPage={setQuesitonPage} setToken = {setToken}/>}>
        </Route>
        </Routes>: 
          <Routes>
              <Route path="/" exact element={<LoginComponent setToken = {setToken} />}></Route>
              <Route path="/register" exact element={<RegisterComponent />}></Route>
          </Routes>
        }   
      </Router>
  );
}

const HomePage = ({ mainTitle, search, setQuesitonPage, setToken }) => {
  return (
    <>
      <Header search={search} setQuesitonPage={setQuesitonPage} setToken={setToken} />
      <Main
        title={mainTitle}
        search={search}
        setQuesitonPage={setQuesitonPage}
      />
    </>
  )
}


