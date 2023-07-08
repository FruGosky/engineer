import { useTranslation } from "react-i18next";

export default function PlanForBegginersWoman() {
  const { t: translation } = useTranslation();

  const TRANSLATED_WOMEN = translation(
    "page.exercises.exercises-beginners-plan.women"
  );
  const TRANSLATED_CAPTION = translation(
    "page.exercises.exercises-beginners-plan.we-execute-plan-as-follows"
  );
  const TRANSLATED_MONDAY = translation(
    "page.exercises.exercises-beginners-plan.monday"
  );
  const TRANSLATED_WEDNESDAY = translation(
    "page.exercises.exercises-beginners-plan.wednesday"
  );
  const TRANSLATED_FRIDAY = translation(
    "page.exercises.exercises-beginners-plan.friday"
  );
  const TRANSLATED_TRAINING = translation(
    "page.exercises.exercises-beginners-plan.training"
  );
  const TRANSLATED_SQUATS = translation(
    "page.exercises.exercises-beginners-plan.squats.title"
  );
  const TRANSLATED_BENCH_PRESS = translation(
    "page.exercises.exercises-beginners-plan.bench-press.title"
  );
  const TRANSLATED_ROWING = translation(
    "page.exercises.exercises-beginners-plan.rowing.title"
  );
  const TRANSLATED_SIDE_RAISES = translation(
    "page.exercises.exercises-beginners-plan.side-raises.title"
  );
  const TRANSLATED_CABLE_CRUNCH = translation(
    "page.exercises.exercises-beginners-plan.cable-crunch.title"
  );
  const TRANSLATED_CALVES = translation(
    "page.exercises.exercises-beginners-plan.calves.title"
  );
  const TRANSLATED_CLASSIC_DEADLIFT = translation(
    "page.exercises.exercises-beginners-plan.classic-deadlift.title"
  );
  const TRANSLATED_MILITARY_PRESS = translation(
    "page.exercises.exercises-beginners-plan.military-press.title"
  );
  const TRANSLATED_CLOSE_GRIP_CHIN_UPS = translation(
    "page.exercises.exercises-beginners-plan.close-grip-chin-ups.title"
  );
  const TRANSLATED_BARBELL_REVERSE_LUNGE = translation(
    "page.exercises.exercises-beginners-plan.barbell-reverse-lunge.title"
  );
  const TRANSLATED_ABDUCTORS = translation(
    "page.exercises.exercises-beginners-plan.abductors.title"
  );
  const TRANSLATED_PLANK = translation(
    "page.exercises.exercises-beginners-plan.plank.title"
  );

  return (
    <div className="mt-5 card-body shadow">
      <h2 className="text-center">{TRANSLATED_WOMEN}</h2>
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
            <td>{`${TRANSLATED_PLANK} x3`}</td>
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
