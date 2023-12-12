fs = require("fs");
const https = require("https");
const fetch = require("node-fetch");
require("process");
require("dotenv").config();

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;

const ERR = {
  noUserName:
    "Github Username was found to be undefined. Please set all relevant environment variables.",
  requestFailed:
    "The request to GitHub didn't succeed. Check if GitHub token in your .env file is correct.",
  requestFailedMedium:
    "The request to Medium didn't succeed. Check if Medium username in your .env file is correct."
};
if (USE_GITHUB_DATA === "true") {
  if (GITHUB_USERNAME === undefined) {
    throw new Error(ERR.noUserName);
  }

  console.log(`Fetching profile data for ${GITHUB_USERNAME}`);
  var data = JSON.stringify({
    query: `
{
  user(login:"${GITHUB_USERNAME}") { 
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
          node {
            ... on Repository {
              name
              description
              forkCount
              stargazers {
                totalCount
              }
              url
              id
              diskUsage
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
}
`
  });
  const default_options = {
    hostname: "api.github.com",
    path: "/graphql",
    port: 443,
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "Node"
    }
  };

  const req = https.request(default_options, res => {
    let data = "";

    console.log(`statusCode: ${res.statusCode}`);
    if (res.statusCode !== 200) {
      throw new Error(ERR.requestFailed);
    }

    res.on("data", d => {
      data += d;
    });
    res.on("end", () => {
      fs.writeFile("./public/profile.json", data, function (err) {
        if (err) return console.log(err);
        console.log("saved file to public/profile.json");
      });
    });
  });

  req.on("error", error => {
    throw error;
  });

  req.write(data);
  req.end();
}

if (MEDIUM_USERNAME !== undefined) {
  console.log(`Fetching Medium blogs data for ${MEDIUM_USERNAME}`);
  let options = {
    hostname: "toptal.com",
    path: `/developers/feed2json/convert?url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
    port: 443,
    method: "GET",
    headers: {
      "User-Agent": "PostmanRuntime/7.35.0"
    }
  };
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      "User-Agent": "PostmanRuntime/7.35.0"
    },
  };
  fetch(`https://toptal.com/developers/feed2json/convert?url=https://medium.com/feed/@${MEDIUM_USERNAME}`, requestOptions)
  .then(response => response.text())
  .then(result => {
    fs.writeFile("./public/blogs.json", result, function (err) {
      if (err) return console.log(err);
      console.log("saved file to public/blogs.json");
    });
  })
  .catch(error => console.log('error', error));


  // const req = https.request(options, res => {
  //   let mediumData = "";
    
  //   if (res.statusCode !== 200) {
  //     console.log("First request failed. Retrying with alternate options.");
  //     options = {
  //       hostname: "feeds.feedburner.com",
  //       path: "/medium/FM5SddpE6X0",
  //       port: 443,
  //       method: "GET"
  //     };
  //     const retryReq = https.request(options, res => {
  //       let retryData = "";
  //       console.log(`Request URL: ${options.hostname}${options.path}`);
  //       console.log(`statusCode: ${res.statusCode}`);
  //       if (res.statusCode !== 200) {
  //         throw new Error(ERR.requestMediumFailed);
  //       }

  //       res.on("data", d => {
  //         retryData += d;
  //       });
  //       res.on("end", () => {
  //         fs.writeFile("./public/blogs.json", retryData, function (err) {
  //           if (err) return console.log(err);
  //           console.log("saved file to public/blogs.json");
  //         });
  //       });
  //     });

  //     retryReq.on("error", error => {
  //       throw error;
  //     });

  //     retryReq.end();
  //   } else {
  //     res.on("data", d => {
  //       mediumData += d;
  //     });
  //     res.on("end", () => {
  //       fs.writeFile("./public/blogs.json", mediumData, function (err) {
  //         if (err) return console.log(err);
  //         console.log("saved file to public/blogs.json");
  //       });
  //     });
  //   }
  // });

  // req.on("error", error => {
  //   throw error;
  // });

  // req.end();
}
