import React from 'react';
import { gql } from 'apollo-boost';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from 'react-apollo-hooks';
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import AppRouter from './Router';
import Footer from './Footer';

// @client를 적지 않으면 apollo가 서버로 요청을 하게 됨
// gql로 쿼리를 만듬
const QUERY = gql`
	{
		isLoggedIn @client
	}
`;

const Wrapper = styled.div`
	margin: 0 auto;
	max-width: 935px;
	width: 100%;
`;

function App() {
	const { data: { isLoggedIn } } = useQuery(QUERY);

	return (
		<ThemeProvider theme={Theme}>
			<Wrapper>
				<GlobalStyles />
				<AppRouter isLoggedIn={isLoggedIn} />
				<Footer />
				<ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
			</Wrapper>
		</ThemeProvider>
	);
}

export default App;
