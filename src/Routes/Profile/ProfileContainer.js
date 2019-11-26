import React from 'react';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import ProfilePresenter from './ProfilePresenter';

const GET_USER = gql`
	query seeUser($name: String!) {
		seeUser(name: $name) {
			id
			avatar
			name
			fullName
			isFollowing
			isSelf
			bio
			followingCount
			followersCount
			postsCount
			posts {
				id
				files {
					url
				}
				likeCount
				commentCount
			}
		}
	}
`;

export default withRouter(({ match: { params: { name } } }) => {
	const { data, loading } = useQuery(GET_USER, { variables: { name } });
	return <ProfilePresenter loading={loading} data={data} />;
});
