import { Badge } from "@sephiro/ui";
import { SephiroLogo } from "./Brand";

export function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <a className="wordmark" href="#top" aria-label="Sephiro home">
          <SephiroLogo />
        </a>
        <div className="topbar__context">
          <span>UI library</span>
          <Badge variant="neutral">v0.2</Badge>
        </div>
      </div>
    </header>
  );
}
