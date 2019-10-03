import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router";
import { Router } from "react-router-dom";
import axios from "axios";
import { createBrowserHistory } from "history";

import NoMatch from "./404/NoMatch";
import EmailConfirmed from "./email-confirmed/EmailConfirmed";
import Header from "./common/header/Header";
import { pathsConst } from "../consts/index";
import Main from "./main/Main";
import About from "./about_us/About";
//import Products from "./products/Products";
import OrderPayment from "./order/OrderPayment";
import Companies from "./companies/Companies";
import Logistic from "./logistic/Logistic";
import Faq from "./faq/Faq";
import Magic from "./magic/Magic";
import Contacts from "./contacts/Contacts";
import Footer from "./common/footer/Footer";
import SearchResult from "./common/search/SearchResult";
// import SiteMap from "./sitemap/SiteMap";
import Advertisement from "./advertisement/Advertisement";
import UnderDevelopment from "./common/underDevelopment/UnderDevelopment";
import Profile from "./profile/Profile";
import AccountSettings from "./account_settings/AccountSettings";
import RegisterCompany from "./register_company/RegisterCompany";
import TariffPlans from "./tariff/TariffPlans";
import TariffPlansInProfile from "./tariff/TariffPlansInProfile";
/* Register */
import Register from "./register-login/Register";
import MainProfile from "./main_profile/MainProfile";
import MakeOrder from "./main_profile/MakeOrder";
import CreateOrder from "./order/create/CreateOrder";
import ConfirmOrder from "./order/confirm/ConfirmOrder";
import OrdersHistory from "./main_profile/OrdersHistory";
import LoginContainer from "./register-login/Containers/LoginContainer";
import ResetPassword from "./register-login/ResetPassword";
import NewPassword from "./register-login/NewPassword";
/* Stripe */
import StripeSend from "./tariff/Stripe/StripeSend";
import StripeResponse from "./tariff/Stripe/StripeResponse";
/* Financial info */
import FinancialInfo from "./financial/FinancialInfo";
/*  News */
import NewsContainer from "./news/NewsContainer";
/* RefreshToken */
import "../assets/css/fonts.css";
import "../assets/css/index.css";
import { fetchClientId } from "../api/fetchApi";

//Redesign
import CategoriesSingle from "./categoriesPage/CategoriesSingle";
import CategoriesMain from "./categoriesPage/CategoriesMain";
import CategoriesAll from "./categoriesPage/CategoriesAll";
import CategoryItemSingle from "./categoriesPage/categorysList/CategoryItemSingle";

// Workspace
import Market from "./workspace/market/Market";
import Deals from "./workspace/deals/Deals";
import Account from "./workspace/my_account/Account";
import ProductsDetails from "./workspace/market/Products/ProductsDetails/ProductsDetails";
import Invite from "./invite/Invite";

const history = createBrowserHistory();
axios.defaults.baseURL = process.env.API_URL;

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetchClientId();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.analytics.page("page changed");
    }
  }

  render() {
    return (
      <Router history={history}>
        <Fragment>
          <div className="application">
            {/* header */}
            <Header />

            <Switch>
              <Route
                exact
                path={pathsConst.UNDER_DEVELOPMENT}
                component={UnderDevelopment}
              />
              <Route exact path={pathsConst.SEARCH} component={SearchResult} />
              <Route exact path={pathsConst.MAIN} component={Main} />
              <Route exact path={pathsConst.LOGIN} component={LoginContainer} />
              <Route
                exact
                path={pathsConst.REGISTER}
                render={() => <Register />}
              />
              <Route
                exact
                path={pathsConst.RESET_PASSWORD}
                component={ResetPassword}
              />
              <Route
                exact
                path={pathsConst.CHANGE_PASSWORD}
                component={NewPassword}
              />
              <Route
                exact
                path={pathsConst.COMPANY_PROFILE}
                component={Profile}
              />
              <Route exact path={pathsConst.SETTINGS} component={Profile} />
              <Route
                exact
                path={pathsConst.ACCOUNT_SETTINGS}
                component={AccountSettings}
              />
              <Route
                exact
                path={pathsConst.REGISTER_COMPANY}
                component={RegisterCompany}
                onChange={() => onUpdateUserPilot()}
              />
              <Route
                exact
                path={pathsConst.TARIFF_PLANS}
                component={TariffPlans}
              />
              <Route
                exact
                path={pathsConst.TARIFF_PLANS_PROFILE}
                component={TariffPlansInProfile}
              />
              <Route exact path={pathsConst.CRYPTO} component={FinancialInfo} />
              <Route exact path={pathsConst.STRIPE} component={StripeSend} />
              <Route
                exact
                path={pathsConst.STRIPE_RESPONSE}
                component={StripeResponse}
              />
              <Route
                exact
                path={pathsConst.MAIN_PROFILE}
                component={MainProfile}
              />
              <Route exact path={pathsConst.MAKE_ORDER} component={MakeOrder} />
              <Route exact path={pathsConst.NEWS} component={NewsContainer} />
              <Route
                exact
                path={pathsConst.CREATE_ORDER}
                component={CreateOrder}
              />
              <Route
                exact
                path={pathsConst.CONFIRM_ORDER}
                component={ConfirmOrder}
              />
              <Route
                exact
                path={pathsConst.ORDERS_HISTORY}
                component={OrdersHistory}
              />
              <Route exact path={pathsConst.COMPANY} component={Companies} />
              <Route exact path={pathsConst.ABOUT_US} component={About} />
              {/* <Route exact path={pathsConst.PRODUCTS} component={Products} /> */}
              <Route
                exact
                path={pathsConst.ORDER_PAYMENT}
                component={OrderPayment}
              />
              <Route exact path={pathsConst.LOGISTIC} component={Logistic} />
              <Route exact path={pathsConst.CONTACTS} component={Contacts} />
              <Route
                exact
                path={pathsConst.ADVERTISEMENT}
                component={Advertisement}
              />
              <Route
                exact
                path={pathsConst.ALL_CATEGORIES}
                component={CategoriesAll}
              />
              <Route
                exact
                path={pathsConst.CATEGORY}
                component={CategoriesSingle}
              />
              <Route
                exact
                path={pathsConst.CATEGORY_PRODUCT}
                component={CategoryItemSingle}
              />

              <Route exact path={pathsConst.FAQ} component={Faq} />
              <Route exact path={pathsConst.MAGIC} component={Magic} />

              {/* Market */}
              <Route exact component={Market} path={pathsConst.MARKET} />
              <Route exact component={Deals} path={pathsConst.DEALS} />
              <Route exact component={Account} path={pathsConst.ACCOUNT} />
              <Route
                exact
                component={ProductsDetails}
                path={pathsConst.PRODUCT}
              />
              <Route exact path={pathsConst.INVITE} component={Invite} />

              {/* <Redirect from="*" to={pathsConst.MAIN} /> */}

              <Route
                exact
                path={pathsConst.EMAIL_CONFIRMED}
                component={EmailConfirmed}
              />

              {/* 404 */}
              <Route component={NoMatch} />
            </Switch>
          </div>

          {/* footer */}
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default App;
