import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"

import App from "./App"

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

if (window.location.hostname === "shirtless.now.sh") {
	serviceWorker.register()
}
