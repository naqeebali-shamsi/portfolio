import React, { useState, useEffect, useContext } from "react";
import "./Blog.scss";
import BlogCard from "../../components/blogCard/BlogCard";
import { blogSection } from "../../portfolio";
import { Fade } from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Blogs() {
  const { isDark } = useContext(StyleContext);
  const [mediumBlogs, setMediumBlogs] = useState([]);
  function setMediumBlogsFunction(array) {
    setMediumBlogs(array);
  }
  //Medium API returns blogs' content in HTML format. Below function extracts blogs' text content within paragraph tags
  function extractTextContent(html) {
    return typeof html === "string"
      ? html
        .split("p>")
        .filter(el => !el.includes(">"))
        .map(el => el.replace("</", ".").replace("<", ""))
        .join(" ")
      : NaN;
  }
  // useEffect(() => {
  //   if (blogSection.displayMediumBlogs === "true") {
  //     const getProfileData = () => {
  //       fetch("/blogs.json")
  //         .then(result => {
  //           if (result.ok) {
  //             return result.json();
  //           }
  //         })
  //         .then(response => {
  //           setMediumBlogsFunction(response.items);
  //         })
  //         .catch(function (error) {
  //           console.error(
  //             `${error} (because of this error Blogs section could not be displayed. Blogs section has reverted to default)`
  //           );
  //           setMediumBlogsFunction("Error");
  //           blogSection.displayMediumBlogs = "false";
  //         });
  //     };
  //     getProfileData();
  //   }
  useEffect(() => {
    if (blogSection.displayMediumBlogs === "true") {
      fetchMediumBlogs(blogSection.mediumUsername);
    }
  }, []);
  async function fetchMediumBlogs(username) {
    const rssUrl = `https://medium.com/feed/@${username}`;

    try {
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`
      );
      const data = await response.json();
      console.log(data);

      if (data && data.items) {
        const blogs = data.items.map((item) => ({
          url: item.link,
          title: item.title,
          description: extractTextContent(item.description),
        }));
        setMediumBlogsFunction(blogs);
        console.log(blogs);
      }
    } catch (error) {
      console.error("Failed to fetch Medium blogs:", error);
    }
  }
  if (!blogSection.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="blogs">
        <div className="blog-header">
          <h1 className="blog-header-text">{blogSection.title}</h1>
          <p
            className={
              isDark ? "dark-mode blog-subtitle" : "subTitle blog-subtitle"
            }
          >
            {blogSection.subtitle}
          </p>
        </div>
        <div className="blog-main-div">
          <div className="blog-text-div">
            {
              blogSection.displayMediumBlogs !== "true" ||
                mediumBlogs === "Error" ||
                !Array.isArray(blogSection.blogs) ? (
                <p>No blogs to display</p>
              ) : (
                blogSection.blogs.map((blog, i) => (
                  <BlogCard
                    key={i}
                    isDark={isDark}
                    blog={{
                      url: blog.url,
                      image: blog.image,
                      title: blog.title,
                      description: blog.description
                    }}
                  />
                ))
              )
            }
          </div>
        </div>
      </div>
    </Fade>
  );
}
