import { useTranslation } from "react-i18next";

export const WOMAN = "exercises-beginners-plan.women";
export const CAPTION = "exercises-beginners-plan.we-execute-plan-as-follows";
export const MONDAY = "exercises-beginners-plan.monday";
export const WEDNESDAY = "exercises-beginners-plan.wednesday";
export const FRIDAY = "exercises-beginners-plan.friday";
export const TRAINING = "exercises-beginners-plan.training";
export const SQUATS = "exercises-beginners-plan.squats";
export const BENCH_PRESS = "exercises-beginners-plan.bench-press";
export const ROWING = "exercises-beginners-plan.rowing";
export const SIDE_RAISES = "exercises-beginners-plan.side-raises";
export const CABLE_CRUNCH = "exercises-beginners-plan.cable-crunch";
export const CALVES = "exercises-beginners-plan.calves";
export const CLASSIC_DEADLIFT = "exercises-beginners-plan.classic-deadlift";
export const MILITARY_PRESS = "exercises-beginners-plan.military-press";
export const CLOSE_GRIP_CHIN_UPS =
  "exercises-beginners-plan.close-grip-chin-ups";
export const BARBELL_REVERSE_LUNGE =
  "exercises-beginners-plan.barbell-reverse-lunge";
export const ABDUCTORS = "exercises-beginners-plan.abductors";
export const PLANK = "exercises-beginners-plan.plank";

export default function PlanForBegginersWoman() {
  const { t: translation } = useTranslation();

  const TRANSLATED_WOMAN = translation(WOMAN);
  const TRANSLATED_CAPTION = translation(CAPTION);
  const TRANSLATED_MONDAY = translation(MONDAY);
  const TRANSLATED_WEDNESDAY = translation(WEDNESDAY);
  const TRANSLATED_FRIDAY = translation(FRIDAY);
  const TRANSLATED_TRAINING = translation(TRAINING);
  const TRANSLATED_SQUATS = translation(SQUATS);
  const TRANSLATED_BENCH_PRESS = translation(BENCH_PRESS);
  const TRANSLATED_ROWING = translation(ROWING);
  const TRANSLATED_SIDE_RAISES = translation(SIDE_RAISES);
  const TRANSLATED_CABLE_CRUNCH = translation(CABLE_CRUNCH);
  const TRANSLATED_CALVES = translation(CALVES);
  const TRANSLATED_CLASSIC_DEADLIFT = translation(CLASSIC_DEADLIFT);
  const TRANSLATED_MILITARY_PRESS = translation(MILITARY_PRESS);
  const TRANSLATED_CLOSE_GRIP_CHIN_UPS = translation(CLOSE_GRIP_CHIN_UPS);
  const TRANSLATED_BARBELL_REVERSE_LUNGE = translation(BARBELL_REVERSE_LUNGE);
  const TRANSLATED_ABDUCTORS = translation(ABDUCTORS);
  const TRANSLATED_PLANK = translation(PLANK);

  return (
    <div className="mt-5 card-body shadow">
      <h2 className="text-center">{TRANSLATED_WOMAN}</h2>
      <table className="table text-center">
        <caption className="text-center">
          {`${TRANSLATED_CAPTION}:`}
          <ul className="list-unstyled">
            <li>
              <a>{`${TRANSLATED_MONDAY} A`}</a>
            </li>
            <li>
              <a>{`${TRANSLATED_WEDNESDAY} B`}</a>
            </li>
            <li>
              <a>{`${TRANSLATED_FRIDAY} A`}</a>
            </li>
            <li>
              <a>{`${TRANSLATED_MONDAY} B`}</a>
            </li>
            <li>
              <a>{`${TRANSLATED_WEDNESDAY} A`}</a>
            </li>
            <li>
              <a>{`${TRANSLATED_FRIDAY} B`}</a>
            </li>
          </ul>
        </caption>

        <thead>
          <tr>
            <th scope="col">{`${TRANSLATED_TRAINING} A`}</th>
            <th scope="col">{`${TRANSLATED_TRAINING} B`}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`${TRANSLATED_SQUATS} 5x5`}</td>
            <td>{`${TRANSLATED_CLASSIC_DEADLIFT} 5x5`}</td>
          </tr>
          <tr>
            <td>{`${TRANSLATED_BENCH_PRESS} 5x5`}</td>
            <td>{`${TRANSLATED_MILITARY_PRESS} 5x5`}</td>
          </tr>
          <tr>
            <td>{`${TRANSLATED_ROWING} 5x5`}</td>
            <td>{`${TRANSLATED_CLOSE_GRIP_CHIN_UPS} 5x5`}</td>
          </tr>
          <tr>
            <td>{`${TRANSLATED_SIDE_RAISES} 3x8`}</td>
            <td>{`${TRANSLATED_BARBELL_REVERSE_LUNGE} 3x8`}</td>
          </tr>
          <tr>
            <td>Hip Thrust 3x8</td>
            <td>{`${TRANSLATED_ABDUCTORS} 3x8`}</td>
          </tr>
          <tr>
            <td>{`${TRANSLATED_CABLE_CRUNCH} 3x8`}</td>
            <td>{`${TRANSLATED_CABLE_CRUNCH} x3`}</td>
          </tr>
          <tr>
            <td>{`${TRANSLATED_CALVES} 3x8`}</td>
            <td>{`${TRANSLATED_CALVES} 3x8`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
