/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/pages/HomeView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';


const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/pages/Error404View'))
  },
  {
    exact: true,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/dashboard" />
      },
      {
        exact: true,
        path: '/app/dashboard',
        component: lazy(() => import('src/views/DashboardView'))
      },
      {
        exact: true,
        path: '/app/account/profile',
        component: lazy(() => import('src/views/AccountView'))    
      },
      {
        exact: true,
        path: '/app/data/call/log/list',
        component: lazy(() => import('src/views/data/callLogs'))    
      },
      {
        exact: true,
        path: '/app/data/call/log/search',
        component: lazy(() => import('src/views/data/logSearch'))    
      },
      {
        exact: true,
        path: '/app/data/call/recordings',
        component: lazy(() => import('src/views/data/CallRecording'))    
      },
      {
        exact: true,
        path: '/app/data/voip/list',
        component: lazy(() => import('src/views/data/Voip'))    
      },
      {
        exact: true,
        path: '/app/data/voip/records',
        component: lazy(() => import('src/views/data/VoipRecording'))    
      },

      {
        exact: true,
        path: '/app/data/messages',
        component: lazy(() => import('src/views/data/Messages'))    
      },
      {
        exact: true,
        path: '/app/data/photos',
        component: lazy(() => import('src/views/data/Photos'))    
      },
      {
        exact: true,
        path: '/app/data/videos',
        component: lazy(() => import('src/views/data/videos'))    
      },
      {
        exact: true,
        path: '/app/data/audios',
        component: lazy(() => import('src/views/data/Audios'))    
      },
      {
        exact: true,
        path: '/app/data/documents',
        component: lazy(() => import('src/views/data/documents'))    
      },
      {
        exact: true,
        path: '/app/data/locations',
        component: lazy(() => import('src/views/data/Locations'))    
      },
      {
        exact: true,
        path: '/app/data/application/history',
        component: lazy(() => import('src/views/data/AppHistory'))    
      },
      {
        exact: true,
        path: '/app/data/web/history',
        component: lazy(() => import('src/views/data/WebHistory'))    
      },
      {
        exact: true,
        path: '/app/data/addressbook',
        component: lazy(() => import('src/views/data/AddressBook'))    
      },
      {
        exact: true,
        path: '/app/data/addressbook/history/call/:id',
        component: lazy(() => import('src/views/data/AddressBook/PhoneHistory'))    
      },
      {
        exact: true,
        path: '/app/data/addressbook/history/message/:id',
        component: lazy(() => import('src/views/data/AddressBook/MailHistory'))    
      },
      {
        exact: true,
        path: '/app/monitor',
        component: lazy(() => import('src/views/MonitorNumber'))    
      },
      {
        exact: true,
        path: '/app/signal/company',
        component: lazy(() => import('src/views/SignalCompany'))    
      },
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: HomeView
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
