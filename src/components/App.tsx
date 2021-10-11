import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import routes from '../Routes/Routes';

const App = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Switch>
        <Route
          exact
          path={routes.PRODUCTS_PAGE.path}
          component={routes.PRODUCTS_PAGE.component}
        />{' '}
        <Route
          path={routes.PRODUCT_PAGE.path}
          component={routes.PRODUCT_PAGE.component}
        />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default App;
