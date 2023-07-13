import { BEGINNERS_PLAN_LINK } from '../BeginnersPlan/BeginnersPlan';
import { EXERCISES_LINK } from '../Exercises';
import styles from './MainPageCard.module.scss';
import { NavLink } from 'react-router-dom';
interface MainPageCardProps {
	header: string;
	description: string;
	buttonDescription_1: string;
	buttonDescription_2: string;
	bHref: string;
	iHref: string;
}

export default function MainPageCard(props: MainPageCardProps) {
	const {
		header,
		description,
		buttonDescription_1,
		buttonDescription_2,
		bHref,
		iHref,
	} = props;

	return (
		<div
			className={`card text-center w-auto mb-2 mt-5 " ${styles.main_styles}`}
		>
			<div className="card-body shadow">
				<h5 className="card-title">{header}</h5>
				<p className="card-text">{description}</p>
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<a
								href={bHref}
								className="btn btn-primary w-auto  mb-2"
								data-mdb-smooth-scroll="smooth-scroll"
							>
								{buttonDescription_1}
							</a>
						</div>
						<div className="col-sm-6">
							{/* <a
                href={iHref}
                className="btn btn-primary w-auto  mb-2"
                data-mdb-smooth-scroll="smooth-scroll"
              >
                
              </a> */}
							<NavLink
								className="nav-link btn btn-primary w-auto mb-2"
								to={EXERCISES_LINK + BEGINNERS_PLAN_LINK}
							>
								{buttonDescription_2}
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
