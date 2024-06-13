import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast'

import Header from "./components/ui/Header";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFound from "./pages/NotFoundPage";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";


function App() {
  const { loading, data } = useQuery(GET_AUTHENTICATED_USER)
	console.log(data)
    if (loading) return null;
	return (
		<>
			{data?.authUser && <Header />}
			<Routes>
				<Route path='/' element={data.authUser ? <HomePage /> : <Navigate  to={'/login'}/>} />
				<Route path='/login' element={!data.authUser ? <LoginPage /> : <Navigate  to={'/'}/>} />
				<Route path='/signup' element={!data.authUser ? <SignUpPage /> : <Navigate  to={'/'}/>} />
				<Route path='/transaction/:id' element={data.authUser ? <TransactionPage />: <Navigate  to={'/login'}/>} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Toaster />
		</>
	);
}
export default App;