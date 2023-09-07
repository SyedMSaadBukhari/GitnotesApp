import React, { useContext } from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Dropdown, Space, Avatar } from "antd";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

const SubMenu = () => {
  const { userData, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const items = [
    {
      label: `Signed in as ${userData.login}`,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: "Your gists",
      key: "1",
      onClick: () => {
        navigate("/UserProfile");
      },
    },

    {
      label: "Starred gists",
      key: "3",
    },
    {
      label: "Help",
      key: "4",
    },
    {
      type: "divider",
    },
    {
      label: "Your Github Profile",
      key: "5",
      onClick: () => {
        window.open(`https://github.com/${userData.login}`, "_blank");
      },
    },
    {
      label: "Signout",
      key: "6",
      danger: true,
      onClick: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        setIsLoggedIn(false);
        navigate("/");
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Space>
        <Avatar
          src={userData.avatar_url}
          size={50}
          icon={<AntDesignOutlined />}
          onClick={() => {
            <SubMenu />;
          }}
        />
      </Space>
    </Dropdown>
  );
};

export default SubMenu;
