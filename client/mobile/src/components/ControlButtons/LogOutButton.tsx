import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationScreenProp, withNavigation } from 'react-navigation';
import { Absolute } from '../../styled/Postions';
import CircleIconButton from '../display/CircleIconButton';
import colors from '../../styled/colors';
import { LOGIN_PAGE } from '../../navigation/pageTypes';
import { Mutation } from 'react-apollo';
import { CLEAR_LOCAL_STATE_MUTATION } from '../../QL/Mutations';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

class LogOutButton extends Component<Props, {}> {
  render() {
    return (
      <Mutation mutation={CLEAR_LOCAL_STATE_MUTATION}>
        {(clearLocalState) => (
          <Absolute top={10} left={10}>
            <CircleIconButton
              bgColor={'transparent'}
              color={colors.light2}
              action={async () => {
                clearLocalState();
                await AsyncStorage.removeItem('token');
                this.props.navigation.navigate(LOGIN_PAGE);
              }}
              icon="log-out"
            />
          </Absolute>
        )}
      </Mutation>
    );
  }
}

export default withNavigation(LogOutButton);
