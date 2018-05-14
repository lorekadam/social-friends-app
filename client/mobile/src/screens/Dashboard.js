import React from 'react';
import { connect } from 'react-redux';

import { Container } from 'native-base';
import styled from 'styled-components';

import ScanStatistics from '../components/ScanStatistics';
import CreateDuel from '../components/CreateDuel';
import Logout from '../components/Logout';

const Dashboard = styled.View`
  display: flex;
  flex-wrap: wrap;
`;

const HalfButton = styled.View`
  width: 50%;
`;

// @Auth
@connect()
export default class DashboardScreen extends React.Component {
  render() {
    return (
      <Container>
        <Dashboard>
          <ScanStatistics />

          <HalfButton>
            <CreateDuel />
          </HalfButton>
          <HalfButton>
            <Logout />
          </HalfButton>
        </Dashboard>
      </Container>
    );
  }
}
