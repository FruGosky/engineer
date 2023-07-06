import styles from "./MainPageCard.module.scss";

export default function MainPageCard(props: any) {
  const {
    header,
    description,
    buttonDescription_1,
    buttonDescription_2,
    bHref,
    iHref,
  } = props;

  return (
    <div className={`card text-center w-75 mb-2 mt-5" ${styles.main_styles}`}>
      <div className="card-body">
        <h5 className="card-title">{header}</h5>
        <p className="card-text">{description}</p>
        <div className="container">
          <div className="row">
            <div className="col">
              <a
                href={bHref}
                className="btn btn-primary w-auto col-sm-6 mb-2"
                data-mdb-smooth-scroll="smooth-scroll"
              >
                {buttonDescription_1}
              </a>
            </div>
            <div className="col">
              <a
                href={iHref}
                className="btn btn-primary w-auto col-sm-6 mb-2"
                data-mdb-smooth-scroll="smooth-scroll"
              >
                {buttonDescription_2}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
