import { gql } from 'apollo-boost';

export const SEARCH = gql`
	query search($term: String!) {
		searchPost(term: $term) {
			files {
				url
			}
			likeCount
			commentCount
			id
		}
		searchUser(term: $term) {
			id
			avatar
			name
			isFollowing
			isSelf
		}
	}
`;
