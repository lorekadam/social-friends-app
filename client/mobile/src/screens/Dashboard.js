import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { Icon } from 'native-base';

import ScanStatistics from '../components/ScanStatistics';
import CreateDuel from '../components/CreateDuel';
import Logout from '../components/Logout';

import HalfButton from '../styled/HalfButton';

const Dashboard = styled.View`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  background-color: black;
`;

// @Auth
@connect()
export default class DashboardScreen extends React.Component {
  render() {
    return (
      <Dashboard>
        <HalfButton>
          <Icon name="md-camera" />
        </HalfButton>
        <HalfButton>
          <Icon name="md-camera" />
        </HalfButton>
        <HalfButton>
          <Icon name="md-camera" />
        </HalfButton>
        <ScanStatistics />
        <CreateDuel />
        <Logout />
      </Dashboard>
    );
  }
}
