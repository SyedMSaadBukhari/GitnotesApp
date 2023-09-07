import React, { useState } from "react";
import { Avatar, Card, Pagination } from "antd";
import useFetch from "../../Hooks/useFetch";
import CardCover from "./CardCover.png";
import "./GridView.scss";

const GridView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useFetch();

  if (loading) {
    return <div>{loading}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const itemsPerPage = 9;
  const totalItems = data.length;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = data.slice(startIndex, endIndex);
  console.log(visibleData);
  const { Meta } = Card;

  return (
    <section className="grid-container">
      <article
        className="grid-view"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {visibleData.map((gist) => {
          const createdTime = new Date(gist.created_at);
          const currentTime = new Date().getTime();
          const timeDifferenceMs = currentTime - createdTime;

          const timeDifferenceHours = Math.floor(
            timeDifferenceMs / (1000 * 60 * 60)
          );
          const filename = Object.keys(gist.files)[0];

          return (
            <Card
              key={gist.id}
              hoverable
              style={{ width: 350, margin: 10 }}
              cover={<img alt="example" src={CardCover} />}
            >
              <Meta
                avatar={<Avatar src={gist.owner.avatar_url} />}
                title={`${gist.owner.login} /${gist.files[filename].type}`}
                description={`Created ${timeDifferenceHours} hours ago approx\n Broadcast Server`}
              />
            </Card>
          );
        })}
      </article>
      <article className="pagination-container">
        <Pagination
          current={currentPage}
          onChange={onPageChange}
          total={totalItems}
          pageSize={itemsPerPage}
          style={{ marginTop: "16px", textAlign: "center" }}
        />
      </article>
    </section>
  );
};
export default GridView;
