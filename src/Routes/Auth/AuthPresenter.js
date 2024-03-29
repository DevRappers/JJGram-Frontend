import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

const Wrapper = styled.div`
	min-height: 80vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Box = styled.div`
	${(props) => props.theme.whiteBox};
	border-radius: 0px;
	width: 100%;
	max-width: 350px;
`;

const StateChanger = styled(Box)`
    text-align: center;
    padding: 20px 0px;
`;

const Link = styled.span`
	color: ${(props) => props.theme.blueColor};
	cursor: pointer;
`;

const Form = styled(Box)`
    padding: 40px;
    padding-bottom: 30px;
    margin-bottom: 15px;
    form {
        width: 100%;
        input{
            width: 100%;
            &:not(:last-child){
                margin-bottom: 7px;
            }
        }
        button{
            margin-top: 10px;
        }
    }
`;

export default ({ action, username, firstName, lastName, email, secret, setAction, onSubmit}) => {
	return (
		<Wrapper>
			<Form>
				{action === 'logIn' && (
					<>
					<Helmet>
						<title>Log In | JJgram</title>
				  	</Helmet>
					<form onSubmit={onSubmit}>
						<Input placeholder={'이메일 주소'} value={email.value} onChange={email.onChange} type="email" />
						<Button text={'로그인'} />
					</form>
					</>
				)}
				{action === 'signUp' && (
					<>
					<Helmet>
						<title>Sign Up | JJgram</title>
				  	</Helmet>
					<form onSubmit={onSubmit}>
						<Input placeholder={'성'} value={firstName.value} onChange={firstName.onChange}/>
						<Input placeholder={'이름'} value={lastName.value} onChange={lastName.onChange} />
						<Input placeholder={'이메일 주소'} value={email.value} onChange={email.onChange} type="email" />
						<Input placeholder={'사용자 이름'} value={username.value} onChange={username.onChange} />
						<Button text={'가입'} />
					</form>
					</>
				)}
				{action === 'confirm' && (
					<>
					<Helmet>
            			<title>Confirm Secret | JJgram</title>
          			</Helmet>
					<form onSubmit={onSubmit}>
						<Input placeholder="시크릿코드" required value={secret.value} onChange={secret.onChange} />
						<Button text={'확인'} />
					</form>
					</>
				)}
			</Form>
			{action !== 'confirm' && (
				<StateChanger>
					{action === 'logIn' ? (
						<div>
							계정이 없으신가요? <Link onClick={() => setAction('signUp')}>가입하기</Link>
						</div>
					) : (
						<div>
							계정이 있으신가요? <Link onClick={() => setAction('logIn')}>로그인</Link>
						</div>
					)}
				</StateChanger>
			)}
		</Wrapper>
	);
};
