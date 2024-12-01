import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';


import { colors } from '~/assets';

import NavigationDrawerStructure from '~/components/NavigationDrawerStructure';
import LogoutButton from '~/components/LogoutButton';
import SideBar from '~/components/SideBar';

import SignIn from '~/pages/Sign/SignIn';
import SignUp from '~/pages/Sign/SignUp';

// import TakePicture from '~/pages/Main/TakePicture';
import TakePicture from '~/pages/Main/Diagnostic';
import ShowMap from '~/pages/Main/ShowMap';
import RecordList from '~/pages/Main/RecordList';

import DiseaseInfo from '~/pages/About/DiseaseInfo';
import TermsOfUse from '~/pages/About/TermsOfUse';

const MainScreen = createBottomTabNavigator(
  {
    TakePicture,
    RecordList,
    ShowMap,
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.white,
      inactiveTintColor: colors.whiteTransparent,
      style: {
        backgroundColor: colors.secondary,
      },
    },
  },
);

const MainStack = createStackNavigator({
  Principal: {
    screen: MainScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Diagnóstico',
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: () => <LogoutButton navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.secondary,
      },
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
      },
      headerTintColor: colors.white,
    }),
  },
});

const AboutScreen = createBottomTabNavigator(
  {
    DiseaseInfo,
    TermsOfUse,
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.white,
      inactiveTintColor: colors.whiteTransparent,
      style: {
        backgroundColor: colors.secondary,
      },
    },
  },
);

const AboutStack = createStackNavigator({
  AboutInfo: {
    screen: AboutScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Sobre',
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.secondary,
      },
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
      },
      headerTintColor: colors.white,
    }),
  },
});

const MainDrawerIcon = ({ tintColor }) => (
  <Icon name="folder-multiple-image" color={tintColor} size={25}/>
);

MainDrawerIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const AboutDrawerIcon = ({ tintColor }) => (
  <Icon name="notebook" color={tintColor} size={25}/>
);

AboutDrawerIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator(
    {
      Sign: createSwitchNavigator(
        {
          SignIn,
          SignUp,
        },
        {
          headerMode: 'none',
        },
      ),
      App: createDrawerNavigator(
        {
          Main: {
            screen: MainStack,
            navigationOptions: {
              drawerLabel: 'Diagnóstico',
              drawerIcon: MainDrawerIcon,
            },
          },
          About: {
            screen: AboutStack,
            navigationOptions: {
              drawerLabel: 'Sobre',
              drawerIcon: AboutDrawerIcon,
            },
          },
        },
        {
          contentComponent: SideBar,
          drawerOpenRoute: 'DrawerOpen',
          drawerCloseRoute: 'DrawerClose',
          drawerToggleRoute: 'DrawerToggle',
        },
      ),
    },
    {
      initialRouteName: userLogged ? 'App' : 'Sign',
    },
  ),
);

export default Routes;
