import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingProject = ({ count }: { count: number }) => {
	let liItems: Array<JSX.Element> = [];

	for (let i = 0; i < count; i++) {
		liItems.push(
			<li>
				<SkeletonTheme color="#1d1e4e" highlightColor="#fff">
					<a href="/" onClick={event => event.preventDefault()}>
						<Skeleton />
					</a>
				</SkeletonTheme>
			</li>
		);
	}

	return <>{liItems}</>;
};

export default LoadingProject;
