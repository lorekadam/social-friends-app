import React, { Component } from 'react';
import Avatar from '../components/Avatar';
import { RowColumn, ColColumn } from '../styled/Grid';

interface Props {
  userId: string;
}

export default class CenteredTop extends Component<Props, {}> {
  render() {
    return (
      <RowColumn noGutters>
        <ColColumn align="center" justify="center">
          <Avatar userId={this.props.userId} />
        </ColColumn>
      </RowColumn>
    );
  }
}
