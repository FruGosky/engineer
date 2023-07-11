import { useTranslation } from "react-i18next";

export default function PlanForIntermediate() {
  const { t: translation } = useTranslation();

  const TRANSLATED_MEN = translation(
    "page.exercises.exercises-beginners-plan.men"
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
    "page.exercises.exercises-beginners-plan.squats"
  );
  const TRANSLATED_BENCH_PRESS = translation(
    "page.exercises.exercises-beginners-plan.bench-press"
  );
  const TRANSLATED_ROWING = translation(
    "page.exercises.exercises-beginners-plan.rowing"
  );
  const TRANSLATED_SIDE_RAISES = translation(
    "page.exercises.exercises-beginners-plan.side-raises"
  );
  const TRANSLATED_CABLE_CRUNCH = translation(
    "page.exercises.exercises-beginners-plan.cable-crunch"
  );
  const TRANSLATED_CALVES = translation(
    "page.exercises.exercises-beginners-plan.calves"
  );
  const TRANSLATED_CLASSIC_DEADLIFT = translation(
    "page.exercises.exercises-beginners-plan.classic-deadlift"
  );
  const TRANSLATED_MILITARY_PRESS = translation(
    "page.exercises.exercises-beginners-plan.military-press"
  );
  const TRANSLATED_CLOSE_GRIP_CHIN_UPS = translation(
    "page.exercises.exercises-beginners-plan.close-grip-chin-ups"
  );
  const TRANSLATED_NARROW_BENCH_PRESS = translation(
    "page.exercises.exercises-beginners-plan.narrow-bench-press"
  );
  const TRANSLATED_PLANK = translation(
    "page.exercises.exercises-beginners-plan.plank"
  );

  return (
    <div className="mt-5 card-body shadow table-responsive">
      <h2 className="text-center">Intermediate</h2>
      <table className="table text-center">
        <caption className="text-center">{TRANSLATED_CAPTION}</caption>

        <thead>
          <tr>
            <th scope="col">{`${TRANSLATED_TRAINING} A`}</th>
            <th scope="col">{`${TRANSLATED_TRAINING} B`}</th>
            <th scope="col">{`${TRANSLATED_TRAINING} A`}</th>
            <th scope="col">{`${TRANSLATED_TRAINING} B`}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`${TRANSLATED_SQUATS} 5x5`}</td>
            <td>{`${TRANSLATED_CLASSIC_DEADLIFT} 5x5`}</td>
            <td>{`${TRANSLATED_SQUATS} 5x5`}</td>
            <td>{`${TRANSLATED_CLASSIC_DEADLIFT} 5x5`}</td>
          </tr>
          <tr>
            <td>{`${TRANSLATED_BENCH_PRESS} 5x5`}</td>
            <td>{`${TRANSLATED_MILITARY_PRESS} 5x5`}</td>
            <td>{`${TRANSLATED_BENCH_PRESS} 5x5`}</td>
            <td>{`${TRANSLATED_MILITARY_PRESS} 5x5`}</td>
          </tr>
          <tr>
            <td>{`${TRANSLATED_ROWING} 5x5`}</td>
            <td>{`${TRANSLATED_CLOSE_GRIP_CHIN_UPS} 5x5`}</td>
            <td>{`${TRANSLATED_ROWING} 5x5`}</td>
            <td>{`${TRANSLATED_CLOSE_GRIP_CHIN_UPS} 5x5`}</td>
          </tr>
          <tr>
            <td>{`${TRANSLATED_SIDE_RAISES} 3x8`}</td>
            <td>{`${TRANSLATED_NARROW_BENCH_PRESS} 3x8`}</td>
            <td>{`${TRANSLATED_SIDE_RAISES} 3x8`}</td>
            <td>{`${TRANSLATED_NARROW_BENCH_PRESS} 3x8`}</td>
          </tr>
          <tr>
            <td>Biceps + Triceps</td>
            <td>Biceps 3x8</td>
            <td>Biceps + Triceps</td>
            <td>Biceps 3x8</td>
          </tr>
          <tr>
            <td>{`${TRANSLATED_CABLE_CRUNCH} 3x8`}</td>
            <td>{`${TRANSLATED_PLANK} 3x8`}</td>
            <td>{`${TRANSLATED_CABLE_CRUNCH} 3x8`}</td>
            <td>{`${TRANSLATED_PLANK} 3x8`}</td>
          </tr>
          <tr>
            <td>{`${TRANSLATED_CALVES} 3x8`}</td>
            <td>{`${TRANSLATED_CALVES} 3x8`}</td>
            <td>{`${TRANSLATED_CALVES} 3x8`}</td>
            <td>{`${TRANSLATED_CALVES} 3x8`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
