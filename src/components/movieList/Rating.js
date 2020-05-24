import React, { Component } from "react";
import styles from "./Rating.module.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Icon } from "@material-ui/core";

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.userRating || 0,
    };
  }
  render() {
    const ratings = [...Array(5)].map((item, index) => index + 1);
    const { changeRating, userRating = 4 } = this.props;
    return (
      <div>
        {ratings.map((item) => {
          return (
            <Icon
              onClick={() => {
                changeRating(item, this.props.movie);
              }}
            >
              {item <= userRating ? <StarBorderIcon /> : <StarIcon />}
            </Icon>
          );
        })}
        <Icon>{/* <StarIcon /> */}</Icon>
      </div>
    );
  }
}

export default Rating;
