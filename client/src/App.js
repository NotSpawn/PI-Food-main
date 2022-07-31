import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/LandingPage/Landing";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import Add from "./components/RecipeAdd/Add";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route path="/recipe" component={Add} />
          <Route path="/home/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
