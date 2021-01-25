import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FourOhFour from './views/404/404';
import Hub from './views/Hub/Hub';
import Dao from './views/Dao/Dao';
import Proposals from './views/Proposals/Proposals';
import Proposal from './views/Proposals/Proposal';
import NewProposal from './views/Proposals/NewProposal';
import Members from './views/Members/Members';
import Profile from './views/Profile/Profile';
import Bank from './views/Bank/Bank';
import NewToken from './views/Bank/NewToken';
import Settings from './views/Settings/Settings';
import Boosts from './views/Settings/Boosts';
import NewBoost from './views/Settings/NewBoost';
import CustomTheme from './views/Settings/CustomTheme';
import Notifications from './views/Settings/Notifications';
import Allies from './views/Settings/Allies';
import NewMember from './views/Members/NewMember';
import DaoMeta from './views/Settings/DaoMeta';
import SummonWrapper from './views/Summon/SummonWrapper';
import RegisterDao from './views/Summon/RegisterDao';
import ExplorWrapper from './views/Explore/ExploreWrapper';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/' exact component={Dao} />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/proposals'
          exact
          component={Proposals}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/proposals/new/:type'
          exact
          component={NewProposal}
        />{' '}
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/proposals/new'
          exact
          component={NewProposal}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/proposals/:id'
          exact
          component={Proposal}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/members'
          exact
          component={Members}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/members/new'
          exact
          component={NewMember}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/profile/:id'
          exact
          component={Profile}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/bank'
          exact
          component={Bank}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/bank/token/new'
          exact
          component={NewToken}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/settings'
          exact
          component={Settings}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/settings/meta'
          exact
          component={DaoMeta}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/settings/boosts'
          exact
          component={Boosts}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/settings/boosts/new'
          exact
          component={NewBoost}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/settings/theme'
          exact
          component={CustomTheme}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/settings/notifications'
          exact
          component={Notifications}
        />
        <Route
          path='/register/:dao(\b0x[0-9a-f]{10,40}\b)/:networkId'
          exact
          component={RegisterDao}
        />
        <Route
          path='/dao/:dao(\b0x[0-9a-f]{10,40}\b)/allies'
          exact
          component={Allies}
        />
        <Route path='/explore' exact component={ExplorWrapper} />
        <Route path='/summon' exact component={SummonWrapper} />
        <Route exact path='/' component={Hub} />
        <Route path='*' component={FourOhFour} />
      </Switch>
    </>
  );
};

export default Routes;
