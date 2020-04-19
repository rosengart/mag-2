import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import pink from "@material-ui/core/colors/pink";

import firebase from "./../firebase";
const storage = firebase.storage();

const useStyles = makeStyles(theme => ({
  section: {
    overflowY: "scroll"
  },

  // Group
  group: {
    padding: theme.spacing(1)
  },
  groupTitle: {
    padding: theme.spacing(2, 1, 1),
    fontSize: 24,
    color: pink[700]
  },
  groupGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gridGap: theme.spacing(1)
  },

  // Tag
  tag: {
    paddingTop: "100%",
    backgroundColor: "#eee",
    position: "relative"
  },
  tagTitle: {
    position: "absolute",
    bottom: theme.spacing(1),
    left: theme.spacing(1)
  },
  tagPicture: {}
}));

// Tag
function Tag(props) {
  const classes = useStyles();

  const { title, slug, picture, position, onChooseTag } = props;

  return (
    <Button
      component={Link}
      to={`/tags/${slug}`}
      className={classes.tag}
      onClick={onChooseTag}
    >
      <div
        className={classes.tagPicture}
        style={{
          backgroundImage: `url('${picture}')`,
          backgroundPosition: position
        }}
      />
      <div className={classes.tagTitle}>{title}</div>
    </Button>
  );
}

// Group
function Group(props) {
  const classes = useStyles();
  const { title, tags, onChooseTag } = props;

  return (
    <div className={classes.group}>
      <div className={classes.groupTitle}>{title}</div>
      <div className={classes.groupGrid}>
        {tags &&
          tags.map(tag => (
            <Tag key={tag.slug} {...tag} onChooseTag={onChooseTag} />
          ))}
      </div>
    </div>
  );
}

// Seciton
export default function Section(props) {
  const classes = useStyles();
  const { title, groups, onChooseTag } = props;

  return (
    <div className={classes.section}>
      {groups &&
        groups.map(group => (
          <Group key={group.title} {...group} onChooseTag={onChooseTag} />
        ))}
    </div>
  );
}
