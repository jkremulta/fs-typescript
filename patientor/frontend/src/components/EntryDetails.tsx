import type { Entry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      switch (entry.healthCheckRating) {
        case 0:
          return (
            <div>
              <div>{entry.date} ✙ </div>
              <div>{entry.description}</div>
              <span>❤️</span>
              <div>diagnose by {entry.specialist}</div>
            </div>
          );
        case 1:
          return (
            <div>
              <div>{entry.date} ✙ </div>
              <div>{entry.description}</div>
              <span>🙂</span>
              <div>diagnose by {entry.specialist}</div>
            </div>
          );
        case 2:
          return (
            <div>
              <div>{entry.date} ✙ </div>
              <div>{entry.description}</div>
              <span>😟</span>
              <div>diagnose by {entry.specialist}</div>
            </div>
          );
        case 3:
          return (
            <div>
              <div>{entry.date} ✙ </div>
              <div>{entry.description}</div>
              <span>⚠️</span>
              <div>diagnose by {entry.specialist}</div>
            </div>
          );
      }
      return null;

    case "OccupationalHealthcare":
      return (
        <div>
          <div>{entry.date} 💼 {entry.employerName}</div>
          <div>{entry.description}</div>
          {entry.sickLeave && (
            <div>
              sick leave: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </div>
          )}
          <div>diagnose by {entry.specialist}</div>
        </div>
      );

    case "Hospital":
      return (
        <div>
          <div>discharge🏥 : {entry.discharge.date}</div>
          <div>{entry.discharge.criteria}</div>
        </div>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;