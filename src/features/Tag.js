import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
      posts: [],
      lastPostId: 0
    };
  }

  loadPosts() {
    const lastPostId = this.state.lastPostId;

    return db
      .collection("posts")
      .where("tags", "array-contains", tag)
      .startAfter(lastPostId)
      .limit(15)
      .get();
  }

  componentDidUpdate(props) {
    const tag = props.tag;
    const posts = this.state.posts;
    let lastPostId = this.state.lastPostId;

    db.collection("posts")
      .where("tags", "array-contains", tag)
      .limit(15)
      .get()
      .then(snapshot => {
        snapshot.forEach(post => {
          const postData = post.data();
          postData.id = post.id;
          lastPostId = post.id;

          posts.push(postData);
        });

        this.setState({
          tag: tag,
          posts: posts,
          lastPostId: lastPostId
        });
      });
  }

  handleShowMore() {
    this.loadPosts().then(snapshot => {
      const posts = this.state.posts;
      let lastPostId = null;

      snapshot.forEach(post => {
        const postData = post.data();
        postData.id = post.id;
        lastPostId = post.id;

        posts.push(postData);
      });

      this.setState({
        posts: posts,
        lastPostId: lastPostId
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
        <div style={{ textAlign: "center" }}>
          <Button onClick={this.handleShowMore}>Mostrar mais</Button>
        </div>
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
