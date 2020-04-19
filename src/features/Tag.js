import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Post from "./Post";

import firebase from "./../firebase";
const db = firebase.firestore();

const useStyles = makeStyles(theme => ({
  tagTitle: {
    padding: theme.spacing(2, 2, 3),
    fontSize: 24
  }
}));

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: props.tag,
      posts: []
    };
  }

  // componentDidMount(props) {
  componentDidUpdate(props) {
    const tag = props.tag;
    const posts = [];
    db.collection("posts")
      .where("tags", "array-contains", tag)
      .limit(10)
      .get()
      .then(snapshot => {
        snapshot.forEach(post => {
          const postData = post.data();
          postData.id = post.id;

          posts.push(postData);
        });

        this.setState({
          tag: tag,
          posts: posts
        });
      });
  }

  render(props) {
    const posts = this.state.posts;

    return (
      <div>
        {posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    );
  }
}

export default function Tag(props) {
  const classes = useStyles();
  const tag = props.match.params.tag.replace(/-/g, " ");

  return (
    <div>
      <div className={classes.tagTitle}>{tag}</div>
      <Gallery tag={tag} />
    </div>
  );
}
