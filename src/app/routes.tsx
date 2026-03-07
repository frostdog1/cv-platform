import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Pages
import HomePage from '@features/cv/pages/HomePage';
import CVPage from '@features/cv/pages/CVPage';
import ContactPage from '@features/cv/pages/ContactPage';
import ArchitecturePage from '@features/engineering/pages/ArchitecturePage';
import DevLogPage from '@features/devlog/pages/DevLogPage';
import CommitHistoryPage from '@features/github/pages/CommitHistoryPage';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/cv" component={CVPage} />
    <Route exact path="/engineering" component={ArchitecturePage} />
    <Route exact path="/devlog" component={DevLogPage} />
    <Route exact path="/commits" component={CommitHistoryPage} />
    <Route exact path="/contact" component={ContactPage} />
  </Switch>
);

export default Routes;
