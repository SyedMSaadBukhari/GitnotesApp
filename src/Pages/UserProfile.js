import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.scss";
import { Avatar, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UserContext } from "../Context/userContext";
import Gist from "react-gists";
import { useNavigate } from "react-router-dom";
import { Octokit } from "@octokit/rest";

const UserProfile = () => {
  const { userData, storedAccessToken } = useContext(UserContext);
  const [gists, setGists] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetchGists();
  }, []);

  const fetchGists = async () => {
    const octokit = new Octokit({
      auth: storedAccessToken,
    });

    try {
      const response = await octokit.request("GET /users/{username}/gists", {
        username: userData.login,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      setGists(response.data);
    } catch (error) {
      console.error("Error fetching gists:", error);
    }
  };

  return (
    <section className="profile-container">
      <article className="profBoxes">
        <section className="User-info">
          <Avatar size={230} src={userData.avatar_url} />
          <h1 className="userName">{userData.login}</h1>
          <Button
            size="large"
            onClick={() => {
              window.open(`https://github.com/${userData.login}`, "_blank");
            }}
          >
            View Github Profile
          </Button>
        </section>
        <section className="User-Gists">
          <article className="add-gist">
            <h1 className="gists-header">All Gists</h1>
            <PlusOutlined
              style={{ fontSize: "32px" }}
              onClick={() => {
                navigate("/CreateGist");
              }}
            />
          </article>

          <ul className="gistlist">
            {gists.map((gist) => (
              <li
                key={gist.id}
                className="gist-embed"
                onClick={() => {
                  navigate(`/gist/${gist.id}`);
                }}
              >
                <Gist id={gist.id} />
              </li>
            ))}
          </ul>
        </section>
      </article>
    </section>
  );
};

export default UserProfile;
