import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import DashboardReducer from "./reducers/DashboardReducer";
import UserReducer from "./reducers/CurrentUserReducer";
import LoadingComponent from "./components/loading/LoadingComponent";
import HttpsRedirect from "react-https-redirect";
import TripsReducer from "./reducers/TripsReducer";
import AppRouter from "./Router";
import AdminReducer from "./reducers/AdminReducer"

const rootReducer = combineReducers({
  DashboardReducer,
  UserReducer,
  TripsReducer,
  AdminReducer
});

const store = createStore(rootReducer);

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="App ap">
      <HttpsRedirect>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </HttpsRedirect>
    </div>
  );
}

export default App;
