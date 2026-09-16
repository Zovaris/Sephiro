import { render } from "preact";
import "@zovaris/sephiro/styles.css";
import "./style.css";
import { App } from "./App";

render(<App />, document.getElementById("app")!);
