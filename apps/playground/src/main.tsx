import { render } from "preact";
import "@sephiro/ui/styles.css";
import "./style.css";
import { App } from "./App";

render(<App />, document.getElementById("app")!);
