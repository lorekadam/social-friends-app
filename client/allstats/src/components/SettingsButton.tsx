import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CircleIconButton from './display/CircleIconButton';

export const TOGGLE_SETTINGS_MUTATION = gql`
  mutation {
    toggleSettings @client
  }
`;

export default class SettingsButton extends Component {
  render() {
    return (
      <Mutation mutation={TOGGLE_SETTINGS_MUTATION}>
        {(toggleSettings) => (
          <CircleIconButton
            icon="settings"
            action={() => {
              toggleSettings();
            }}
          />
        )}
      </Mutation>
    );
  }
}
