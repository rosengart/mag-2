import React from "react"
import { Link } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import pink from "@material-ui/core/colors/pink"

import firebase from "./../firebase"
const storage = firebase.storage()
const storageBucket = storage.ref()

const useStyles = makeStyles(theme => ({
	section: {
		overflowY: "scroll",
	},

	// Group
	group: {
		padding: theme.spacing(1),
	},
	groupTitle: {
		padding: theme.spacing(2, 1, 1),
		fontSize: 24,
		color: pink[700],
	},
	groupGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
		gridGap: theme.spacing(1),
	},

	// Tag
	tag: {
		paddingTop: "100%",
		backgroundColor: "#eee",
		position: "relative",
	},
	tagTitle: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		padding: theme.spacing(1),
		backgroundColor: "rgba(0,0,0, 0.333)",
		color: "#fff",
	},
	tagPicture: {},
}))

class Picture extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			reference: props.reference,
			url: null,
			size: props.size,
			position: props.position,
		}
	}

	componentDidMount() {
		const reference = this.state.reference

		if (reference) {
			storageBucket
				.child(`media/${reference}`)
				.getDownloadURL()
				.then(url => {
					this.setState({ url: url })
				})
		}
	}

	render() {
		const { url, size, position } = this.state

		return (
			url && (
				<div
					style={{
						position: "absolute",
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						backgroundImage: `url('${url}')`,
						backgroundSize: size || "100%",
						backgroundPosition: position || "50% 50%",
					}}
				/>
			)
		)
	}
}

// Tag
function Tag(props) {
	const classes = useStyles()

	const { title, slug, picture, size, position, onChooseTag } = props

	return (
		<Button component={Link} to={`/tags/${slug}`} className={classes.tag} onClick={onChooseTag}>
			<Picture reference={picture} size={size} position={position} />
			<div
				className={classes.tagPicture}
				style={{
					backgroundImage: `url('${picture}')`,
					backgroundPosition: position,
				}}
			/>
			<div className={classes.tagTitle}>{title}</div>
		</Button>
	)
}

// Group
function Group(props) {
	const classes = useStyles()
	const { title, tags, onChooseTag } = props

	return (
		<div className={classes.group}>
			<div className={classes.groupTitle}>{title}</div>
			<div className={classes.groupGrid}>
				{tags && tags.map(tag => <Tag key={tag.slug} {...tag} onChooseTag={onChooseTag} />)}
			</div>
		</div>
	)
}

// Section
export default function Section(props) {
	const classes = useStyles()
	const { groups, onChooseTag } = props

	return (
		<div className={classes.section}>
			{groups &&
				groups.map(group => (
					<Group key={group.title} {...group} onChooseTag={onChooseTag} />
				))}
		</div>
	)
}
