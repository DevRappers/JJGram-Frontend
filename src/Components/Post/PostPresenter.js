import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-autosize-textarea';
import FatText from '../FatText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Comment as CommentIcon } from '../Icons';

const Post = styled.div`
	${(props) => props.theme.whiteBox};
	width: 100%;
	max-width: 600px;
	margin-bottom: 25px;
	user-select: none;
	a {
		color: inherit;
	}
`;

const Header = styled.header`
	padding: 15px;
	display: flex;
	align-items: center;
`;

const Caption = styled.div`margin: 10px 0px;`;

const UserColumn = styled.div`margin-left: 10px;`;

const Location = styled.span`
	display: block;
	margin-top: 5px;
	font-size: 12px;
`;

const Files = styled.div`
	position: relative;
	padding-top: 100%;
`;

const File = styled.img`
	max-width: 100%;
	width: 100%;
	height: 600px;
	position: absolute;
	top: 0;
	background-image: url(${(props) => props.src});
	background-size: cover;
	background-position: center;
	opacity: ${(props) => (props.showing ? 1 : 0)};
	transition: opacity .5s linear;
`;

const Button = styled.span`cursor: pointer;`;

const Meta = styled.div`padding: 15px;`;

const Buttons = styled.div`
	${Button} {
		&:first-child {
			margin-right: 10px;
		}
	}
	margin-bottom: 10px;
`;

const Timestamp = styled.span`
	font-weight: 400;
	text-transform: uppercase;
	opacity: 0.5;
	display: block;
	font-size: 12px;
	margin: 10px 0px;
	padding-bottom: 10px;
	border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize:none;
    font-size: 14px;
    &:focus{
        outline: none;
    }
`;

const Comments = styled.ul`margin-top: 10px;`;

const Comment = styled.li`
	margin-bottom: 7px;
	span {
		margin-right: 5px;
	}
`;

const PostPresenter = ({
	user: { name, avatar },
	location,
	files,
	isLiked,
	likeCount,
	createdAt,
	newComment,
	currentItem,
	toggleLike,
	onKeyPress,
	comments,
	selfComments,
	caption
}) => {
	const today = new Date(createdAt);
	const dateString = today.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	const dayName = today.toLocaleDateString('ko-KR', {
		weekday: 'long'
	});
	return (
		<Post>
			<Header>
				<Avatar size="sm" url={avatar} />
				<UserColumn>
					<Link to={`/${name}`}>
						<FatText text={name} />
					</Link>
					<Location>{location}</Location>
				</UserColumn>
			</Header>
			<Files>
				{files &&
					files.map((file, index) => <File key={file.id} src={file.url} showing={index === currentItem} />)}
			</Files>
			<Meta>
				<Buttons>
					<Button onClick={toggleLike}>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
					<Button>
						<CommentIcon />
					</Button>
				</Buttons>
				<FatText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
				<Caption>
					<FatText text={name} /> {caption}
				</Caption>
				{comments && (
					<Comments>
						{comments.map((comment) => (
							<Comment key={comment.id}>
								<FatText text={comment.user.name} />
								{comment.text}
							</Comment>
						))}
						{selfComments.map((comment) => (
							<Comment key={comment.id}>
								<FatText text={comment.user.name} />
								{comment.text}
							</Comment>
						))}
					</Comments>
				)}
				<Timestamp>
					{dateString} {dayName}
				</Timestamp>
				<Textarea
					placeholder="Add a comment..."
					value={newComment.value}
					onChange={newComment.onChange}
					onKeyPress={onKeyPress}
				/>
			</Meta>
		</Post>
	);
};

export default PostPresenter;
