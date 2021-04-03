/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./slider.css";
import axios from "axios";
import PropTypes from "prop-types";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
const token = Buffer.from(
  `${process.env.USER}:${process.env.PASSWORD}`,
  "utf8"
).toString("base64");
const basicAuth = {
  Authorization: `Basic ${token}`,
};

/**
 * @function Slider
 */
const Slider = () => {
  const [url, setUrl] = useState(`https://api.github.com/users/gaearon`);
  const [data, setData] = useState({});
  const [cachedData, setCachedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const nicks = ["gaearon", "acdlite", "yyx990803", "unclebob", "martinfowler"];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (cachedData[url]) {
        setError(false);
        setData(cachedData[url]);
        setIsLoading(false);
        return;
      }
      try {
        const result = await axios(url, {}, { headers: basicAuth });
        setError(false);
        setData(result.data);
        setCachedData({ ...cachedData, [url]: result.data });
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    };

    fetchData();
  }, [url]);
  return (
    <Carousel
      autoPlay={false}
      animation={"slide"}
      navButtonsAlwaysVisible={true}
      onChange={(current, previous) => {
        setUrl(
          `https://api.github.com/users/${nicks[current]}`,
          {},
          {
            headers: basicAuth,
          }
        );
      }}
    >
      {nicks.map((nick, i) => (
        <Item
          key={i}
          nick={nick}
          data={data}
          isLoading={isLoading}
          error={error}
        />
      ))}
    </Carousel>
  );
};

const Item = (props) => {
  if (props.error) {
    return <div>{`Error`}</div>;
  }
  return props.isLoading ? (
    <div>{"LOADING..."}</div>
  ) : (
    <Paper>
      <h2>{props.nick}</h2>
      <img className="image" src={props.data.avatar_url}></img>
    </Paper>
  );
};

Item.propTypes = {
  nick: PropTypes.string.isRequired,
  data: PropTypes.shape({
    avatar_url: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

export default Slider;
