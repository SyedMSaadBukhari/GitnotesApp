import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import Gist from "react-gists";
import "./UserGistDisplay.scss";
import {
  ForkOutlined,
  StarOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Space, InputNumber, Avatar } from "antd";
import { deleteGist, starGist } from "../Helpers/Actions";
import GistUpdateForm from "./GistUpdateForm";

const UserGistDisplay = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const { gistId } = useParams();

  const token = localStorage.getItem("accessToken");
  // const fileName = "local.txt";

  return (
    <section className="UserGist-container">
      <article className="userGist-actions">
        <section className="user-info">
          <article className="userAvatar">
            <Avatar src={userData.avatar_url} />
          </article>
          <article className="userLogin">
            <p className="user-name">
              {userData.login} / <strong>package.json</strong>
            </p>
          </article>
        </section>
        <section className="Authuser-actions">
          <Space>
            <EditOutlined className="edit-gist" onClick={() => {}} />
            <p>Edit</p>
            <DeleteOutlined
              className="delete-gist"
              onClick={() => {
                try {
                  deleteGist(token, gistId);
                  navigate("/UserProfile");
                } catch (error) {
                  console.error("Error deleting gist:", error);
                }
              }}
              token={token}
            />
            <p>Delete</p>
            <StarOutlined
              className="gist-star"
              onClick={() => {
                try {
                  starGist(token, gistId);
                  navigate("/UserProfile");
                  console.log("Gist starred Successfully");
                } catch (error) {
                  console.error("Error starring gist:", error);
                }
              }}
              token={token}
            />
            <p>Star</p>
            <InputNumber defaultValue={0} size="small" readOnly />
            <ForkOutlined className="gist-fork" />
            <p>Fork</p>
            <InputNumber defaultValue={0} size="small" readOnly />
          </Space>
        </section>
      </article>

      <article className="Gist-play">
        <Gist id={gistId} />
      </article>
      <article className="updateForm">
        <GistUpdateForm />
      </article>
    </section>
  );
};

export default UserGistDisplay;
