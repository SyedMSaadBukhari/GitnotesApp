import { Octokit } from "@octokit/rest";

export const createGist = async (description, fileName, fileContent, token) => {
  const octokit = new Octokit({
    auth: token,
  });

  await octokit.request("POST /gists", {
    description: description,
    public: true,
    files: {
      "README.md": {
        filename: fileName,
        content: fileContent,
      },
    },
  });
};

//updateGist
export const updateGist = async (
  gistId,
  token,
  fileName,
  description,
  content
) => {
  const octokit = new Octokit({
    auth: token,
  });

  await octokit.request("PATCH /gists/{gist_id}", {
    gist_id: gistId,
    description: description,
    files: {
      "README.md": {
        filename: fileName,
        content: content,
      },
    },
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};

// Delete a gist
export const deleteGist = async (token, gistId) => {
  const octokit = new Octokit({
    auth: token,
  });

  try {
    const response = await octokit.request("DELETE /gists/{gist_id}", {
      gist_id: gistId,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    console.log(response);
  } catch (error) {
    throw error;
  }
};

// Fork a gist

export const forkGist = async (token, gistId) => {
  const octokit = new Octokit({
    auth: token,
  });

  await octokit.request("POST /gists/{gist_id}/forks", {
    gist_id: gistId,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};

// Star a gist
export const starGist = async (token, gistId) => {
  const octokit = new Octokit({
    auth: token,
  });

  await octokit.request("PUT /gists/{gist_id}/star", {
    gist_id: gistId,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};
