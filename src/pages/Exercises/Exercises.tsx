import { useEffect, useState } from "react";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import { useTranslation } from "react-i18next";
import MainPageCard from "./components/MainPageCard";
import styles from "./ExercisesContent.module.scss";
import PlanForBegginersWoman from "./content/PlanForBeginnersWoman";
import PlanForBegginersMan from "./content/PlanForBeginnersMan";

export const EXERCISES_TITLE = "page.exercises.title";
export const EXERCISES_LINK = "/exercises";

export const PLAN_CARD_HEADER = "exercises-main-page-card.plan-card.header";
export const PLAN_CARD_DESCRIPTION =
  "exercises-main-page-card.plan-card.description";
export const PLAN_CARD_BTN1 = "exercises-main-page-card.plan-card.btn-1";
export const PLAN_CARD_BTN2 = "exercises-main-page-card.plan-card.btn-2";

export const EXERCISE_DESCRIPTION_CARD_HEADER =
  "exercises-main-page-card.exercises-description-card.header";
export const EXERCISE_DESCRIPTION_CARD_DESCRIPTION =
  "exercises-main-page-card.exercises-description-card.description";
export const EXERCISE_DESCRIPTION_CARD_BTN1 =
  "exercises-main-page-card.exercises-description-card.btn-1";
export const EXERCISE_DESCRIPTION_CARD_BTN2 =
  "exercises-main-page-card.exercises-description-card.btn-2";

export default function Exercises() {
  const [loading, setLoading] = useState(true);
  const { t: translation } = useTranslation();

  const TRANSLATED_TITLE = translation(EXERCISES_TITLE);
  useWebsiteTitle(TRANSLATED_TITLE);

  const TRANSLATED_PLAN_CARD_HEADER = translation(PLAN_CARD_HEADER);
  const TRANSLATED_PLAN_CARD_DESCRIPTION = translation(PLAN_CARD_DESCRIPTION);
  const TRANSLATED_PLAN_CARD_BTN1 = translation(PLAN_CARD_BTN1);
  const TRANSLATED_PLAN_CARD_BTN2 = translation(PLAN_CARD_BTN2);

  const TRANSLATED_EXERCISE_DESCRIPTION_CARD_HEADER = translation(
    EXERCISE_DESCRIPTION_CARD_HEADER
  );
  const TRANSLATED_EXERCISE_DESCRIPTION_CARD_DESCRIPTION = translation(
    EXERCISE_DESCRIPTION_CARD_DESCRIPTION
  );
  const TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN1 = translation(
    EXERCISE_DESCRIPTION_CARD_BTN1
  );
  const TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN2 = translation(
    EXERCISE_DESCRIPTION_CARD_BTN2
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1_000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //TODO! translate PlanForBegginersMan
  return loading ? (
    <LoadingIcon />
  ) : (
    <div>
      <div className={`${styles.exercises_main_content} `}>
        <section className="header_section" id="main-card-page-section">
          <MainPageCard
            header={TRANSLATED_PLAN_CARD_HEADER}
            description={TRANSLATED_PLAN_CARD_DESCRIPTION}
            buttonDescription_1={TRANSLATED_PLAN_CARD_BTN1}
            buttonDescription_2={TRANSLATED_PLAN_CARD_BTN2}
            bHref="#beginner-plan-section"
            iHref="#intermediate-plan-section"
          />
          <MainPageCard
            header={TRANSLATED_EXERCISE_DESCRIPTION_CARD_HEADER}
            description={TRANSLATED_EXERCISE_DESCRIPTION_CARD_DESCRIPTION}
            buttonDescription_1={TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN1}
            buttonDescription_2={TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN2}
            bHref="#beginner-exercises-section"
            iHref="#beginner-exercises-section"
          />
        </section>
      </div>

      <section
        id="beginner-plan-section"
        className={`${styles.training_plan_section} ${styles.section_clip_path} border-top d-flex align-items-center justify-content-center`}
      >
        <PlanForBegginersWoman />
      </section>
      <section
        id="beginner-plan-section"
        className={`${styles.training_plan_section} ${styles.section_clip_path} border-top d-flex align-items-center justify-content-center`}
      >
        <PlanForBegginersMan />
      </section>
      <section
        id="intermediate-plan-section"
        className={`${styles.training_plan_section}`}
      >
        Training plans -
        <div className="">
          intermediate section - table with exercises and accesorium
        </div>
      </section>
      <section
        id="beginner-exercises-section"
        className={`${styles.training_plan_section}`}
      >
        Training plans -
        <div className="">
          exercises for begginers - kafelki po klknieciu wyskakuje opis
          cwiczenia cos takiego
        </div>
      </section>
      <section
        id="intermediate-exercises-section"
        className={`${styles.training_plan_section} secondary_section`}
      >
        Training plans -
        <div className="">
          exercises for intermediate - kafelki po klknieciu wyskakuje opis
          cwiczenia cos takiego
        </div>
      </section>
    </div>
  );
}
