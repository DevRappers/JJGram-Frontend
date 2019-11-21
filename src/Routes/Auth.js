import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../Components/Input';
import Button from '../Components/Button';
import useInput from '../Hooks/useInput';

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

function Auth() {
	const [ action, setAction ] = useState('logIn');
	const username = useInput('');
	const password = useInput('');
	const firstName = useInput('');
	const lastName = useInput('');
	const email = useInput('');

	return (
		<Wrapper>
			<Form>
				{action === 'logIn' ? (
					<form>
						<Input placeholder={'사용자 이름'} {...username} />
						<Input placeholder={'비밀번호'} {...password} type="password" />
						<Button text={'로그인'} />
					</form>
				) : (
					<form>
						<Input placeholder={'성'} {...firstName} />
						<Input placeholder={'이름'} {...lastName} />
						<Input placeholder={'이메일 주소'} {...email} type="email" />
						<Input placeholder={'사용자 이름'} {...username} />
						<Input placeholder={'비밀번호'} {...password} type="password" />
						<Button text={'가입'} />
					</form>
				)}
			</Form>
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
		</Wrapper>
	);
}

export default Auth;
