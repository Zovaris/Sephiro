import type { ComponentChildren } from "preact";

type SpecimenProps = {
  title: string;
  description: string;
  api: string;
  wide?: boolean;
  className?: string;
  children: ComponentChildren;
};

export function Specimen({ title, description, api, wide, className, children }: SpecimenProps) {
  const classes = ["specimen", wide && "specimen--wide", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className="specimen__info">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="specimen__api">{api}</span>
      </div>
      <div className="specimen__demo">{children}</div>
    </div>
  );
}
