import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingCard = ({ count }: { count: number }) => {
	let cardArray: Array<JSX.Element> = [];

	for (let i = 0; i < count; i++) {
		cardArray.push(
			<div className="col-lg-3">
				<div
					className="card department-card-design"
					data-aos="fade-up"
					data-aos-duration="500"
					data-aos-delay="400"
				>
					<div className="text-content">
						<span className="department-card-design-title">
							<SkeletonTheme color="#c3c3c3" highlightColor="#fff">
								<Skeleton />
							</SkeletonTheme>
						</span>
						<p className="department-card-design-p">
							<SkeletonTheme color="#c3c3c3" highlightColor="#fff">
								<Skeleton />
							</SkeletonTheme>
						</p>
					</div>
				</div>
			</div>
		);
	}

	return <>{cardArray}</>;
};

export default LoadingCard;
