import { useMeasurement } from "../lib/measure";
import type { Specimen as SpecimenData } from "../specimens";

type SpecimenProps = {
  number: number;
  data: SpecimenData;
  revision: string;
};

export function Specimen({ number, data, revision }: SpecimenProps) {
  const [ref, measurement] = useMeasurement(data.selector ?? "", revision);
  const Demo = data.demo;

  return (
    <article className="specimen" id={`specimen-${data.id}`} ref={ref}>
      <div className="band__margin">
        <a
          className="anno anno__num folio"
          href={`#specimen-${data.id}`}
          title={`Link to the ${data.name} specimen`}
        >
          №&nbsp;{String(number).padStart(2, "0")}
        </a>
        <div className="measures">
          {measurement.readings.map((reading) => (
            <p className="anno measures__row" key={reading.key}>
              <span className="measures__key">{reading.key}</span>
              <span className="measures__val">{reading.value}</span>
            </p>
          ))}
        </div>
        <p className="anno states">
          {measurement.states.map((state) => (
            <span className="states__item" key={state}>
              {state}
            </span>
          ))}
        </p>
      </div>
      <div className="band__body">
        <h3 className="specimen__name">{data.name}</h3>
        <p className="specimen__api">{data.api}</p>
        <div className="specimen__demo">
          <Demo />
        </div>
        <p className="specimen__note">{data.note}</p>
      </div>
    </article>
  );
}
