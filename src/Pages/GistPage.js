import React from "react";
import { ForkOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, InputNumber, Space } from "antd";
import "./GistPage.scss";
import Gist from "react-gists";

const GistPage = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const gistID = queryParams.get("id");
  const avatar = queryParams.get("avatar");
  const name = queryParams.get("name");
  return (
    <main className="gist-page">
      <section className="gist-container">
        <article className="gist-inform">
          <section className="user-inform">
            <Avatar size={60} src={avatar} />
            <h2 className="username">{name}</h2>
          </section>
          <section className="user-actions">
            <Space>
              <StarOutlined className="gist-star" />
              <p>Star</p>
              <InputNumber defaultValue={0} size="small" readOnly />
              <ForkOutlined className="gist-fork" />
              <p>Fork</p>
              <InputNumber defaultValue={0} size="small" readOnly />
            </Space>
          </section>
        </article>

        <article className="frame-container">
          <Gist id={gistID} />
        </article>
      </section>
    </main>
  );
};

export default GistPage;
