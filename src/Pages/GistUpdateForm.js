import React, { useState } from "react";
import { Button, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./GistUpdateForm.scss";
import { updateGist } from "../Helpers/Actions";
import { useNavigate, useParams } from "react-router-dom";

const GistUpdateForm = () => {
  const { gistId } = useParams();
  const { TextArea } = Input;
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [content, setContent] = useState("");
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
  return (
    <section className="updateForm-container">
      <article className="update-form">
        <Form className="EditForm">
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
              rows={2}
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
                updateGist(gistId, token, fileName, description, content);
                navigate("/UserProfile");
              }}
            >
              Update Gist
            </Button>
          </Form.Item>
        </Form>
      </article>
    </section>
  );
};

export default GistUpdateForm;
