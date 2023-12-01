import React from "react";

import { Badge, Box, Image } from "@mantine/core";

var Row2 = [
  require("../../assets/1A/1A.png"),
  require("../../assets/2A/2A.png"),
  require("../../assets/3A/3A.png"),
  require("../../assets/4A/4A.png"),
  require("../../assets/1B/1B.png"),
  require("../../assets/2B/2B.png"),
  require("../../assets/3B/3B.png"),
  require("../../assets/4B/4B.png"),
];

var textLabels = [
  "Hours in lines in front of a sales office",
  "You spend a lot of time and sometimes you make a mistake",
  "",
  "Sometiemes the price includes hidden fees",
  "...Or just go to our website ",
  "Plenty of good options and no pressure to make a right decision ",
  "It’s an auction. So there is a fixed starting price for everyone",
  "It's such a good deal!",
];

const ComicPic = (ind: any) => {
  console.log(textLabels[ind.ind].length > 0, textLabels[ind.ind].length);

  return (
    <div style={{ position: "relative" }}>
      <Image radius="sm" src={Row2[ind.ind]} />

      {textLabels[ind.ind].length > 0 && (
        <div
          style={{
            position: "absolute",
            left: "-4%",
            top: "-2%",
            height: "auto",
            backgroundColor: "#fafafa",
            borderRadius: "3px",
            border: "2px black solid",
            color: "black",
            fontSize: "17px",
            fontWeight: 400,
            maxWidth: "400px",
            textAlign: "left",
            padding: "5px 15px",
            fontFamily: "Comic Book",
          }}
        >
          {textLabels[ind.ind]}
        </div>
      )}
    </div>
  );
};

export default ComicPic;
