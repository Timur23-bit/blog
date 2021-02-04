import Header from "../Header/Header";
import List from "../List/List";
import Article from "../Article/Article";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import EditProfile from "../EditProfile/EditProfile";
import CreateArticle from "../CreatArticle/CreateArticle";
import { BrowserRouter as Router, Route} from "react-router-dom";

export default function App() {
	return (
		<div>
			<Router>
				<Header />
				<Route path='/articles' exact component={List}/>
				<Route path='/' component={List} exact/>
				<Route path='/articles/:slug' component={({match}) => {
					return <Article slug={match.params.slug}/>
				}}/>
			{/*<CreateArticle/>*/}
			{/*<EditProfile/>*/}
			{/*<SignIn/>*/}
			{/*<SignUp />*/}
			{/*<Article />*/}
			{/*<List />*/}
			</Router>
		</div>
	);
}