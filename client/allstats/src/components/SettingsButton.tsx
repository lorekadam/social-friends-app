import React, { Component } from 'react';
import { CircleButton } from '../styled/Buttons';
import { Feather } from '@expo/vector-icons';
import colors from '../styled/colors';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

interface Props {
  size?: number;
}

export const TOGGLE_SETTINGS_MUTATION = gql`
  mutation {
    toggleSettings @client
  }
`;

export default class SettingsButton extends Component<Props, {}> {
  render() {
    const { size } = this.props;
    return (
      <Mutation mutation={TOGGLE_SETTINGS_MUTATION}>
        {(toggleSettings) => (
          <CircleButton
            onPress={() => {
              toggleSettings();
            }}
            size={size ? size : 40}
          >
            <Feather
              color={colors.white}
              name="settings"
              size={size ? size / 2 : 20}
            />
          </CircleButton>
        )}
      </Mutation>
    );
  }
}
