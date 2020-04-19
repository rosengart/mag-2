import React from "react"
import { useParams } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import pink from "@material-ui/core/colors/pink"

import Post from "./Post"

import firebase from "./../firebase"
const db = firebase.firestore()

const useStyles = makeStyles(theme => ({
	tag: {
		paddingBottom: theme.spacing(4),
	},
	tagTitle: {
		padding: theme.spacing(2, 2, 0),
		fontSize: 44,
		color: pink[600],
	},
}))

class Gallery extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tag: props.tag,
			posts: [],
			lastVisibleDoc: null,
		}
	}

	getPosts() {
		const tag = this.state.tag
		const posts = this.state.posts
		let lastVisibleDoc = this.state.lastVisibleDoc

		return db
			.collection("posts")
			.where("tags", "array-contains", tag)
			.orderBy("tumblr-id")
			.startAfter(lastVisibleDoc)
			.limit(12)
			.get()
			.then(snapshot => {
				snapshot.forEach(post => {
					const postData = post.data()
					postData.id = post.id
					lastVisibleDoc = post

					posts.push(postData)
				})

				this.setState({
					posts: posts,
					lastVisibleDoc: lastVisibleDoc,
				})
			})
	}

	componentDidMount() {
		this.setState({ tag: this.props.tag })
		this.getPosts()
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.tag !== prevState.tag) {
			this.setState((state, props) => ({
				tag: props.tag,
				posts: [],
				lastVisibleDoc: null,
			}))

			this.getPosts()
		}
	}

	render() {
		const posts = this.state.posts

		return (
			<div>
				{posts.map(post => (
					<Post key={post.id} {...post} />
				))}
				{posts && (
					<div style={{ textAlign: "center" }}>
						<Button variant="outlined" color="primary" onClick={() => this.getPosts()}>
							Mostrar mais
						</Button>
					</div>
				)}
			</div>
		)
	}
}

export default function Tag(props) {
	const classes = useStyles()
	// const tag = formatTag(props.match.params.tag);
	const { tag } = useParams()

	return (
		<div className={classes.tag}>
			<div className={classes.tagTitle}>{tag}</div>
			<Gallery tag={tag} />
		</div>
	)
}
