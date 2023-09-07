import React, { useState, useContext } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./NavBar.scss";
import { Space } from "antd";
import { UserContext } from "../../Context/userContext";
import GitLogin from "../../Helpers/GitLogin";
import SubMenu from "../SubMenu/SubMenu";

const NavBar = () => {
  const { setSearchQuery, isLoggedIn } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <nav className="nav">
      <section className="logo">
        <img className="logoImg" src="/EMumba.png" alt="E-Logo" />
        <p className="logo-name">MUMBA</p>
      </section>

      <section className="search-login">
        <Space>
          <form className="form" action="">
            <input
              type="text"
              placeholder="Search by ID.."
              name="q"
              onChange={handleInputChange}
            ></input>
            <SearchOutlined onClick={handleSearch} />
          </form>
          {isLoggedIn ? <SubMenu /> : <GitLogin />}
        </Space>
      </section>
    </nav>
  );
};

export default NavBar;
