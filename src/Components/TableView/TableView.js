import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import { ForkOutlined, StarOutlined } from "@ant-design/icons";
import useFetch from "../../Hooks/useFetch.js";
import "./TableView.scss";
import { UserContext } from "../../Context/userContext.js";

const TableView = () => {
  const { searchQuery } = useContext(UserContext);
  const { data, loading, error } = useFetch();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filteredData = data.filter((item) => {
      return item.id.toString() === searchQuery;
    });
    setFilteredData(filteredData);
  }, [data, searchQuery]);

  const columns = [
    {
      title: "",
    },
    {
      title: "",
      dataIndex: "owner",
      render: (owner) => (
        <img
          src={owner.avatar_url}
          alt="Avatar"
          style={{ width: 50, borderRadius: "50%" }}
        />
      ),
      key: "avatar",
    },

    {
      title: "Name",
      dataIndex: "owner",
      render: (owner) => owner.login,
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (date) => {
        return new Date(date).toLocaleDateString();
      },
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "created_at",
      render: (time) => {
        return new Date(time).toLocaleTimeString();
      },
      key: "time",
    },
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => <span className="gist-id">{id}</span>,
      key: "id",
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            const { id, owner } = record;
            window.location.href = `/GistPage?id=${id}&avatar=${owner.avatar_url}&name=${owner.login}`;
            console.log(record, rowIndex);
          },
        };
      },
    },

    {
      title: "Notebook Name",
      dataIndex: "owner",
      render: (owner) => owner.type,
      key: "notebookName",
    },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: () => (
        <>
          <StarOutlined className="table-star" />
          <ForkOutlined className="table-fork" />
        </>
      ),
    },
  ];

  if (error) return <h1>Error: {error}</h1>;
  return (
    <>
      <section className="table-container">
        <Table
          loading={loading}
          className="table"
          columns={columns}
          dataSource={!searchQuery ? data : filteredData}
          rowKey="id"
        ></Table>
      </section>
    </>
  );
};

export default TableView;
