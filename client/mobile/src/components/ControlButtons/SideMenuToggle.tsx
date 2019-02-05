import React, { Component } from 'react';
import { Absolute } from '../../styled/Postions';
import CircleIconButton from '../display/CircleIconButton';
import colors from '../../styled/colors';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

export const TOGGLE_SIDEBAR_MUTATION = gql`
  mutation {
    toggleSidebar @client
  }
`;

export default class SideMenuToggle extends Component {
  render() {
    return (
      <Mutation mutation={TOGGLE_SIDEBAR_MUTATION}>
        {(toggleSidebar) => (
          <Absolute top={10} right={10}>
            <CircleIconButton
              buttonColor={'transparent'}
              color={colors.light2}
              action={() => toggleSidebar()}
              icon="settings"
            />
          </Absolute>
        )}
      </Mutation>
    );
  }
}
