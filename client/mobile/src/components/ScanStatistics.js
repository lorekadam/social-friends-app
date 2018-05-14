// import React from 'react';

// import { connect } from 'react-redux';
// import { Button, Icon } from 'native-base';
// import { navChange } from '../actions/navigationActions';

// import * as types from '../actions/types';

// @connect()
// export default class ScanStatistics extends React.Component {
//   render() {
//     return (
//       <Button
//         large
//         styles={{ width: 200 }}
//         onPress={() => this.props.dispatch(navChange(types.CAMERA_SCREEN))}
//       >
//         <Icon name="md-camera" />
//       </Button>
//     );
//   }
// }

import React from 'react';

import { connect } from 'react-redux';
import { Button, Icon } from 'native-base';
import styled from 'styled-components';
import { navChange } from '../actions/navigationActions';

import * as types from '../actions/types';

const HalfButton = styled.View`
  background-color: red;
  align-items: center;
  display: flex;
  width: 50%;
`;

@connect()
export default class ScanStatistics extends React.Component {
  render() {
    return (
      <HalfButton onPress={() => this.props.dispatch(navChange(types.CAMERA_SCREEN))}>
        <Icon name="md-camera" />
      </HalfButton>
    );
  }
}
