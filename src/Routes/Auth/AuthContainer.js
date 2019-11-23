import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from './AuthQueries';
import { toast } from 'react-toastify';

export default () => {
	const [ action, setAction ] = useState('logIn');
	const username = useInput('');
	const firstName = useInput('');
	const lastName = useInput('');
	const secret = useInput('');
	const email = useInput('');

	const [ requestSecretMutation ] = useMutation(LOG_IN, {
		variables: { email: email.value }
	});

	const [ createAccountMutation ] = useMutation(CREATE_ACCOUNT, {
		variables: { email: email.value, name: username.value, firstName: firstName.value, lastName: lastName.value }
	});

	const [ confirmSecretMutation ] = useMutation(CONFIRM_SECRET, {
		variables: { secret: secret.value, email: email.value }
	});

	const [ localLogInMutation ] = useMutation(LOCAL_LOG_IN);

	const onSubmit = async (e) => {
		e.preventDefault();
		if (action === 'logIn') {
			if (email.value !== '') {
				try {
					const { data: { requestSecret } } = await requestSecretMutation();
					if (!requestSecret) {
						toast.error('회원가입되지 않은 이메일 주소 입니다. 회원가입이 필요합니다.');
						setTimeout(() => setAction('signUp'), 2000);
					} else {
						toast.success('이메일로 발송된 시크릿코드를 확인해주세요.');
						setAction('confirm');
					}
				} catch (e) {
					toast.error('시크릿 코드를 요청할 수 없습니다. 다시 시도 해주세요.');
				}
			} else {
				toast.error('Email주소를 입력해주세요');
			}
		} else if (action === 'signUp') {
			if (email.value !== '' && username.value !== '' && firstName !== '' && lastName !== '') {
				try {
					const { data: { createAccount } } = await createAccountMutation();
					if (!createAccount) {
						toast.error('계정을 생성할 수 없습니다.');
					} else {
						toast.success('회원가입이 완료되었습니다. 로그인 해주세요.');
						setTimeout(() => setAction('logIn'), 2000);
					}
				} catch (e) {
					toast.error(e.message);
				}
			} else {
				toast.error('모든 항목을 기입해주세요.');
			}
		} else if (action === 'confirm') {
			if (secret.value !== '') {
				try {
					const { data: { confirmSecret: token } } = await confirmSecretMutation();
					if (token !== '' && token !== undefined) {
						localLogInMutation({
							variables: { token }
						});
					} else {
						throw Error();
					}
				} catch (e) {
					toast.error('시크릿코드를 확인할 수 없습니다. 다시 시도 해주세요.');
				}
			}
		}
	};

	return (
		<AuthPresenter
			setAction={setAction}
			action={action}
			username={username}
			firstName={firstName}
			lastName={lastName}
			email={email}
			secret={secret}
			onSubmit={onSubmit}
		/>
	);
};
