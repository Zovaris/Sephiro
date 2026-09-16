import { Badge } from "@sthlabs/sephiro-ui";
import pkg from "@sthlabs/sephiro-ui/package.json";
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
          <Badge variant="neutral">v{pkg.version}</Badge>
        </div>
      </div>
    </header>
  );
}
