import React from "react"
import { Link } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"

import firebase from "./../firebase"
const storage = firebase.storage()
const storageBucket = storage.ref()

const useStyles = makeStyles(theme => ({
	post: {
		padding: theme.spacing(2, 0, 3),
	},

	// Pictures
	pictures: {
		"& img": {
			width: "100%",
		},
	},

	// Tags
	tags: {
		padding: theme.spacing(0, 1),

		"& > *": {
			margin: theme.spacing(0.5, 0.25),
		},
	},
}))

// Picture
class Picture extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			reference: props.reference,
			url: null,
		}
	}

	componentDidMount() {
		storageBucket
			.child(`media/${this.state.reference}`)
			.getDownloadURL()
			.then(url => {
				this.setState({ url: url })
			})
	}

	render() {
		const { reference, url } = this.state
		return <div>{url && <img src={url} alt={reference} />}</div>
	}
}

// Tag
function Tag(props) {
	const { label } = props

	return <Chip clickable component={Link} to={`/tags/${label}`} size="small" label={label} />
}

// Post
export default function Post(props) {
	const classes = useStyles()
	const { id, media, tags } = props

	return (
		<div className={classes.post} data-id={id}>
			<div className={classes.pictures}>
				{media && media.map(picture => <Picture key={picture} reference={picture} />)}
			</div>
			<div className={classes.tags}>
				{tags && tags.map(tag => <Tag key={tag} label={tag} />)}
			</div>
		</div>
	)
}
