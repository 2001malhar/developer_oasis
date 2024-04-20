import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ search, setQuesitonPage,setToken }) => {
    const [val, setVal] = useState(search);
    const navigate = useNavigate();

    const logOut = () =>{
        localStorage.removeItem('token')
        setToken('')
        navigate("/")
    }
    return (
        
        <div id="header" className="header">
            <button className="sign_out"
                onClick={logOut}>
                Sign Out 
            </button>

            <div></div>
            <div className="title">Fake Stack Overflow</div>
            <input
                id="searchBar"
                placeholder="Search ..."
                type="text"
                value={val}
                onChange={(e) => {
                    setVal(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        setQuesitonPage(e.target.value, "Search Results");
                    }
                }}
            />

        </div>
    );
};

export default Header;
