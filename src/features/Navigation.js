import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Fab from "@material-ui/core/Fab"
import Drawer from "@material-ui/core/Drawer"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import TagIcon from "@material-ui/icons/LocalOffer"

import Section from "./Section"
import firebase from "./../firebase"
const db = firebase.firestore()

const useStyles = makeStyles(theme => ({
	fab: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}))

function Start(props) {
	const classes = useStyles()

	return (
		<Fab color="primary" className={classes.fab} onClick={props.onClick}>
			<TagIcon />
		</Fab>
	)
}

export default class Navigation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			navigation: [],
			sections: {},
			drawerOpen: props.open || false,
			activeSection: null,
		}
	}

	componentDidMount() {
		db.collection("navigation").onSnapshot(snapshot => {
			const navigation = []
			const sections = {}

			snapshot.forEach(section => {
				const sectionData = section.data()
				const sectionId = section.id

				navigation.push({
					id: sectionId,
					title: sectionData.title,
					icon: sectionData.icon,
					order: sectionData.order,
				})

				// Ordena grupos
				if (sectionData.groups) {
					sectionData.groups.sort((a, b) => (a.order > b.order ? 1 : -1))

					// Ordena tags
					sectionData.groups.forEach(group => {
						if (group.tags) {
							group.tags.sort((a, b) => (a.order > b.order ? 1 : -1))
						}
					})
				}

				sections[sectionId] = sectionData
			})

			// Ordena seções
			navigation.sort((a, b) => (a.order > b.order ? 1 : -1))

			this.setState({
				navigation: navigation,
				sections: sections,
			})

			if (this.state.activeSection === null) {
				this.setState({
					activeSection: navigation[0].id,
				})
			}
		})
	}

	handleDrawer(newValue) {
		this.setState({ drawerOpen: newValue })
	}

	handleSectionChange(event, newValue) {
		this.setState({ activeSection: newValue })
	}

	render() {
		const { navigation, sections, drawerOpen, activeSection } = this.state

		return (
			<>
				<Start onClick={() => this.handleDrawer(true)} />
				<Drawer
					anchor="bottom"
					PaperProps={{
						style: {
							maxHeight: "90vh",
						},
					}}
					open={drawerOpen}
					onClose={() => this.handleDrawer(false)}
				>
					<Section
						{...sections[activeSection]}
						onChooseTag={() => this.handleDrawer(false)}
					/>
					<Paper
						elevation={6}
						style={{
							position: "sticky",
							bottom: 0,
							left: 0,
							right: 0,
						}}
					>
						<BottomNavigation
							showLabels
							value={activeSection}
							onChange={this.handleSectionChange.bind(this)}
						>
							{navigation.map(section => (
								<BottomNavigationAction
									key={section.id}
									label={section.title}
									value={section.id}
									icon={section.icon}
								/>
							))}
						</BottomNavigation>
					</Paper>
				</Drawer>
			</>
		)
	}
}
