import React, { Component } from 'react';
import { RowColumn, ColColumn } from '../../styled/Grid';
import Accordion from '../Animations/Accordion';
import { PaddingView } from '../../styled/View';
import { Text } from '../../styled/Text';

interface Props {
  open: boolean;
}

export default class Settings extends Component<Props, {}> {
  render() {
    return (
      <Accordion open={this.props.open}>
        <PaddingView padding={5}>
          <RowColumn>
            <ColColumn justify="flex-end">
              <Text>Settings</Text>
            </ColColumn>
          </RowColumn>
        </PaddingView>
      </Accordion>
    );
  }
}
