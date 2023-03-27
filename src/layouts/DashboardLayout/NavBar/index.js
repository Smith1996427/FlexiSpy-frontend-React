/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, {useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector,   useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  TextField,
  makeStyles
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import {
  Book as BookIcon,
  Globe as GlobeIcon,
  User as UserIcon,
  Layers as LayerIcon,
  Mail as MailIcon,
  PieChart as PieChartIcon,
  Phone as PhoneIcon,
  PhoneCall as PhoneCallIcon,
  Camera as CameraIcon,
  Volume2 as SpeakerIcon,
  MapPin as MapPinIcon,
  Users as UsersIcon
} from 'react-feather';
import Logo from 'src/components/Logo';
import NavItem from './NavItem';
import {MdAddCall, MdWhatsapp, MdPhoneAndroid, MdAddBusiness} from 'react-icons/md';
import {BsCameraVideo} from 'react-icons/bs';
import { updateProfile } from 'src/actions/currentPhoneActions';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {formatPhoneNumberIntl } from 'react-phone-number-input';

const navConfig = [
  {
    // subheader: 'Reports',
    subheader: ' ',
    items: [
      {
        title: 'Dashboard',
        icon: PieChartIcon,
        href: '/app/dashboard'
      },
      {
        title: 'Account',
        icon: UserIcon,
        href: '/app/account/profile'
      },
      {
        title: 'Data',
        icon: LayerIcon,
        items: [
          {
            title: 'Call Log',
            icon: PhoneIcon,
            href: '/app/data/call/log/list'
          },
          {
            title: 'Call Recording',
            icon: PhoneCallIcon,
            href: '/app/data/call/recordings'
          },
          {
            title: 'VoIP',
            icon: MdAddCall,
            href: '/app/data/voip/list'
          },
          {
            title: 'VoIP Records',
            icon: MdWhatsapp,
            href: '/app/data/voip/records'
          },
          {
            title: 'Emails',
            icon: MailIcon,
            href: '/app/data/messages'
          },
          {
            title: 'Photos',
            icon: CameraIcon,
            href: '/app/data/photos'
          },
          {
            title: 'Videos',
            icon: BsCameraVideo,
            href: '/app/data/videos'
          }
          ,
          {
            title: 'Audios',
            icon: SpeakerIcon,
            href: '/app/data/audios'
          },
          {
            title: 'Documents',
            icon: ReceiptIcon,
            href: '/app/data/documents'
          },
          {
            title: 'Locations',
            icon: MapPinIcon,
            href: '/app/data/locations'
          },
          {
            title: 'App Activity',
            icon: MdPhoneAndroid,
            href: '/app/data/application/history'
          },
          {
            title: 'Web Activity',
            icon: GlobeIcon,
            href: '/app/data/web/history'
          },
          {
            title: 'Address Book',
            icon: BookIcon,
            href: '/app/data/addressbook'
          }
        ]
      },
      {
        title: 'Device Number',
        icon: UserIcon,
        href: '/app/monitor'
      },
      {
        title: 'Signal Company',
        icon: MdAddBusiness,
        href: '/app/signal/company'
      }
    ]
  }
];


const navConfigAgent = [
  {
    // subheader: 'Reports',
    subheader: ' ',
    items: [
      {
        title: 'Dashboard',
        icon: PieChartIcon,
        href: '/app/dashboard'
      },
      {
        title: 'Account',
        icon: UserIcon,
        href: '/app/account/profile'
      },
      {
        title: 'My Users',
        icon: UsersIcon,
        href: '/app/account/myusers'
      },
      {
        title: 'Data',
        icon: LayerIcon,
        items: [
          {
            title: 'Call Log',
            icon: PhoneIcon,
            href: '/app/data/call/log/list'
          },
          {
            title: 'Call Recording',
            icon: PhoneCallIcon,
            href: '/app/data/call/recordings'
          },
          {
            title: 'VoIP',
            icon: MdAddCall,
            href: '/app/data/voip/list'
          },
          {
            title: 'VoIP Records',
            icon: MdWhatsapp,
            href: '/app/data/voip/records'
          },
          {
            title: 'Emails',
            icon: MailIcon,
            href: '/app/data/messages'
          },
          {
            title: 'Photos',
            icon: CameraIcon,
            href: '/app/data/photos'
          },
          {
            title: 'Videos',
            icon: BsCameraVideo,
            href: '/app/data/videos'
          }
          ,
          {
            title: 'Audios',
            icon: SpeakerIcon,
            href: '/app/data/audios'
          },
          {
            title: 'Documents',
            icon: ReceiptIcon,
            href: '/app/data/documents'
          },
          {
            title: 'Locations',
            icon: MapPinIcon,
            href: '/app/data/locations'
          },
          {
            title: 'App Activity',
            icon: MdPhoneAndroid,
            href: '/app/data/application/history'
          },
          {
            title: 'Web Activity',
            icon: GlobeIcon,
            href: '/app/data/web/history'
          },
          {
            title: 'Address Book',
            icon: BookIcon,
            href: '/app/data/addressbook'
          }
        ]
      },
      {
        title: 'Device Number',
        icon: UserIcon,
        href: '/app/monitor'
      },
      {
        title: 'Signal Company',
        icon: MdAddBusiness,
        href: '/app/signal/company'
      }
    ]
  }
]

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 210
  },
  desktopDrawer: {
    width: 210,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  avatar1: {
    cursor: 'pointer',
    width: 48,
    height: 48
  },
  phoneInputcontainer : {
    fontSize :20,
    "& .PhoneInputCountry" : {
      margin :16
    },
    "& .PhoneInputInput" : {
      fontSize : 24,
      padding : 7,
      border : "none",
      borderBottom : "solid 1px grey",
      outline : "none"
    }
  }
}));


function NavBar({ openMobile, onMobileClose, }) {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useSelector((state) => state.account);
  const { users } = useSelector((state) => state.accounts);

  const dispatch = useDispatch();
  const [currentPhone, setCurrentPhone] = useState("");

  const { phoneNumbers } = useSelector((state) => state.userPhones);

  const handlePhoneChange = (e) => {
    setCurrentPhone(e.target.value)
    dispatch(updateProfile(e.target.value));
  }


  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  console.log(formatPhoneNumberIntl(phoneNumbers[0]))

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/app/account">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={users.avatar}
              />
            </RouterLink>
          </Box>
          <Box
            mt={2}
            textAlign="center"
          >
            <Link
              component={RouterLink}
              to="/app/account/profile"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {users.name} 
            </Link>
            <br />
            <TextField
              name="phone"
              onChange={handlePhoneChange}
              select
              SelectProps={{ native: true }}
              value={currentPhone}
            >
              {phoneNumbers.map((state) => (
                <option
                  key={state}
                  value={state}
                >
                    {/* <PhoneInput
                      className={classes.phoneInputcontainer}
                      name = "phonInput"
                      value={state}
                      onChange = {setCurrentPhone}
                      disabled
                    />   */}
                    {formatPhoneNumberIntl(state)}
                </option>
              ))}
            </TextField>
          </Box>
        </Box>
        <Divider /> 
        <Box p={2}>
          {(users.role === ("agent")) &&
          navConfigAgent.map((config) => (
            <List
              key={config.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {config.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))
          }
          {(users.role === ("user")) &&
          navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {config.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))
          }
        </Box>
        <Divider />
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
