import { useState } from "preact/hooks";
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Notice,
  Separator,
  Surface,
  Table,
} from "@sephiro/ui";
import { CatalogSection } from "./CatalogSection";
import { Specimen } from "./Specimen";

export function FeedbackCatalog() {
  const [noticeVisible, setNoticeVisible] = useState(true);

  return (
    <CatalogSection
      id="feedback"
      index="04"
      title="Feedback & data"
      description="Status, structure and honest empty states for data-heavy surfaces."
      count="5 specimens · 6 components"
    >
      <Specimen
        title="Alert"
        description="Persistent inline status. Unlike Toast it stays in the layout flow, tied to the surface it describes, until resolved or dismissed."
        api="Alert / info · success · warning · danger"
        wide
      >
        <div className="alert-stack">
          <Alert variant="info" title="Autosave is on">
            Changes are saved as you work.
          </Alert>
          <Alert variant="success" title="Synced">
            The workspace is ready to share.
          </Alert>
          <Alert variant="warning" title="Storage is almost full">
            Archive an old workspace to keep syncing.
          </Alert>
          <Alert
            variant="danger"
            title="Sync failed"
            dismissible
            onDismiss={() => {}}
          >
            We will retry in the background.
          </Alert>
        </div>
      </Specimen>

      <div className="specimen-grid">
        <Specimen
          title="Notice"
          description="Same vocabulary as Alert for inline product notes."
          api="Notice"
        >
          <div className="alert-stack">
            {noticeVisible ? (
              <Notice
                variant="info"
                title="New shortcut"
                dismissible
                onDismiss={() => setNoticeVisible(false)}
              >
                Press ⌘K to jump between workspaces.
              </Notice>
            ) : (
              <p className="demo-copy">
                Dismissed. Reload the preview to bring it back.
              </p>
            )}
          </div>
        </Specimen>

        <Specimen
          title="Surface, card & separator"
          description="Structure with a restrained elevation vocabulary."
          api="Surface + Card + Separator"
        >
          <Surface tone="elevated" padding="sm">
            <Card
              title="Asterism"
              description="Personal workspace"
              footer={<span className="specimen__api">Synced just now</span>}
            >
              <Separator />
              <p className="demo-copy">A place for the next decision.</p>
            </Card>
          </Surface>
        </Specimen>
      </div>

      <div className="specimen-grid">
        <Specimen
          title="Empty state"
          description="A useful next step when there is nothing to show."
          api="EmptyState / default · compact"
        >
          <EmptyState
            compact
            title="No saved views"
            description="Create one to return to this filter later."
            action={<Button variant="secondary">Create view</Button>}
          />
        </Specimen>

        <Specimen
          title="Table empty"
          description="The same honesty inside structured data."
          api="Table / emptyMessage"
        >
          <Table
            caption="Archived workspaces"
            columns={[
              { key: "name", label: "Workspace" },
              { key: "updated", label: "Updated", align: "end" },
            ]}
            rows={[]}
            emptyMessage="No archived workspaces yet."
          />
        </Specimen>
      </div>

      <Specimen
        title="Table"
        description="Readable structured data with density and striping."
        api="Table / comfortable · compact"
        wide
      >
        <div className="table-demo">
          <Table
            striped
            stickyHeader
            caption="Recent workspaces"
            columns={[
              { key: "name", label: "Workspace" },
              { key: "status", label: "Status" },
              { key: "updated", label: "Updated", align: "end" },
            ]}
            rows={[
              {
                name: "Asterism",
                status: <Badge variant="success">Synced</Badge>,
                updated: "2m ago",
              },
              {
                name: "Sephiro",
                status: <Badge variant="accent">Draft</Badge>,
                updated: "Yesterday",
              },
            ]}
          />
          <Table
            density="compact"
            caption="Compact density"
            columns={[
              { key: "name", label: "Workspace" },
              { key: "status", label: "Status" },
            ]}
            rows={[
              {
                name: "Asterism",
                status: <Badge variant="success">Synced</Badge>,
              },
            ]}
          />
        </div>
      </Specimen>
    </CatalogSection>
  );
}
