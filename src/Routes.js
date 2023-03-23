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
import GuestGuard from 'src/components/GuestGuard';

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
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    path: '/register-unprotected',
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
        path: '/app/account',
        component: lazy(() => import('src/views/pages/AccountView'))
      },
      {
        exact: true,
        path: '/app/reports/dashboard',
        component: lazy(() => import('src/views/reports/DashboardView'))
      },
      {
        exact: true,
        path: '/app/reports/dashboard-alternative',
        component: lazy(() => import('src/views/reports/DashboardAlternativeView'))
      },
      {
        exact: true,
        path: '/app/reports',
        component: () => <Redirect to="/app/reports/dashboard" />
      },
      {
        exact: true,
        path: '/app/management/customers',
        component: lazy(() => import('src/views/management/CustomerListView'))
      },
      {
        exact: true,
        path: '/app/management/customers/:customerId',
        component: lazy(() => import('src/views/management/CustomerDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/customers/:customerId/edit',
        component: lazy(() => import('src/views/management/CustomerEditView'))
      },
      {
        exact: true,
        path: '/app/management/products',
        component: lazy(() => import('src/views/management/ProductListView'))
      },
      {
        exact: true,
        path: '/app/management/products/create',
        component: lazy(() => import('src/views/management/ProductCreateView'))
      },
      {
        exact: true,
        path: '/app/management/orders',
        component: lazy(() => import('src/views/management/OrderListView'))
      },
      {
        exact: true,
        path: '/app/management/orders/:orderId',
        component: lazy(() => import('src/views/management/OrderDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/invoices',
        component: lazy(() => import('src/views/management/InvoiceListView'))
      },
      {
        exact: true,
        path: '/app/management/invoices/:invoiceId',
        component: lazy(() => import('src/views/management/InvoiceDetailsView'))
      },
      {
        exact: true,
        path: '/app/management',
        component: () => <Redirect to="/app/management/customers" />
      },
      {
        exact: true,
        path: '/app/calendar',
        component: lazy(() => import('src/views/calendar/CalendarView'))
      },
      {
        exact: true,
        path: '/app/kanban',
        component: lazy(() => import('src/views/kanban/KanbanView'))
      },
      {
        exact: true,
        path: [
          '/app/chat/new',
          '/app/chat/:threadKey'
        ],
        component: lazy(() => import('src/views/chat/ChatView'))
      },
      {
        exact: true,
        path: '/app/chat',
        component: () => <Redirect to="/app/chat/new" />
      },
      {
        exact: true,
        path: [
          '/app/mail/label/:customLabel/:mailId?',
          '/app/mail/:systemLabel/:mailId?'
        ],
        component: lazy(() => import('src/views/mail/MailView'))
      },
      {
        exact: true,
        path: '/app/mail',
        component: () => <Redirect to="/app/mail/all" />
      },
      {
        exact: true,
        path: '/app/projects/overview',
        component: lazy(() => import('src/views/projects/OverviewView'))
      },
      {
        exact: true,
        path: '/app/projects/browse',
        component: lazy(() => import('src/views/projects/ProjectBrowseView'))
      },
      {
        exact: true,
        path: '/app/projects/create',
        component: lazy(() => import('src/views/projects/ProjectCreateView'))
      },
      {
        exact: true,
        path: '/app/projects/:id',
        component: lazy(() => import('src/views/projects/ProjectDetailsView'))
      },
      {
        exact: true,
        path: '/app/projects',
        component: () => <Redirect to="/app/projects/browse" />
      },
      {
        exact: true,
        path: '/app/social/feed',
        component: lazy(() => import('src/views/social/FeedView'))
      },
      {
        exact: true,
        path: '/app/social/profile',
        component: lazy(() => import('src/views/social/ProfileView'))
      },
      {
        exact: true,
        path: '/app/social',
        component: () => <Redirect to="/app/social/profile" />
      },
      {
        exact: true,
        path: '/app/extra/charts/apex',
        component: lazy(() => import('src/views/extra/charts/ApexChartsView'))
      },
      {
        exact: true,
        path: '/app/extra/forms/formik',
        component: lazy(() => import('src/views/extra/forms/FormikView'))
      },
      {
        exact: true,
        path: '/app/extra/forms/redux',
        component: lazy(() => import('src/views/extra/forms/ReduxFormView'))
      },
      {
        exact: true,
        path: '/app/extra/editors/draft-js',
        component: lazy(() => import('src/views/extra/editors/DraftEditorView'))
      },
      {
        exact: true,
        path: '/app/extra/editors/quill',
        component: lazy(() => import('src/views/extra/editors/QuillEditorView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
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
        exact: true,
        path: '/pricing',
        component: lazy(() => import('src/views/pages/PricingView'))
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
