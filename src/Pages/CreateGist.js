import React, { useState } from "react";
import { Button, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./CreateGist.scss";
import { createGist } from "../Helpers/Actions";
import { useNavigate } from "react-router-dom";

const CreateGist = () => {
  const { TextArea } = Input;
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const token = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  // const handleInput = () => {
  //   createGist(description, fileName, fileContent, token);
  //   navigate("/UserProfile");
  // };
  return (
    <section className="updateForm-container">
      <article className="update-form">
        <Form>
          <Form.Item>
            <Input
              placeholder="Enter gist decription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <TextArea
              placeholder="Enter file content"
              rows={4}
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Add File</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                try {
                  createGist(description, fileName, fileContent, token);
                  navigate("/UserProfile");
                } catch (error) {
                  console.error("Error creating gist:", error);
                }
              }}
              token={token}
            >
              Create Gist
            </Button>
          </Form.Item>
        </Form>
      </article>
    </section>
  );
};

export default CreateGist;
