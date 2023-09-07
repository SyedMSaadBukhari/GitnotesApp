import React, { useState } from "react";
import "./Home.scss";
import TableView from "../Components/TableView/TableView";
import GridView from "../Components/GridView/GridView";
import {
  UnorderedListOutlined,
  AppstoreOutlined,
  LineOutlined,
} from "@ant-design/icons";

const Home = () => {
  const [viewMode, setViewMode] = useState("table");
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <>
      <section className="toggle-display">
        <article className="toggle-btns">
          <AppstoreOutlined onClick={() => toggleViewMode("grid")} />
          <LineOutlined />
          <UnorderedListOutlined onClick={() => toggleViewMode("table")} />
        </article>
      </section>

      <section>{viewMode === "table" ? <TableView /> : <GridView />}</section>
    </>
  );
};

export default Home;
