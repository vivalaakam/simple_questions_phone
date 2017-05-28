import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from './containers/Login';
import Settings from './containers/Settings';
import Notifications from './containers/Notifications';
import Questions from './containers/Questions/Questions';
import Question from './containers/Questions/Question';
import QuestionsForm from './containers/Questions/Form';

export default StackNavigator({
  Login: {
    screen: Login
  },
  Settings: {
    screen: Settings
  },
  Notifications: {
    screen: Notifications
  },
  Questions: {
    screen: Questions
  },
  Question: {
    screen: Question
  },
  QuestionsForm: {
    screen: QuestionsForm
  }
}, {
  initialRouteName: 'Questions',
  navigationOptions: {
    headerTintColor: '#e1e4e9',
    tintColor: '#e1e4e9',
    headerStyle: {
      backgroundColor: '#474f60'
    }
  }
});
