import React, { Component } from 'react';
import { Text } from 'react-native';
import CircleIconButton from '../display/CircleIconButton';
import { Row, Col } from '../../styled/Grid';

interface Props {
  name: string;
  accepted: boolean;
  id: string;
}

export default class FriendListItem extends Component<Props, {}> {
  render() {
    const { name, accepted, id } = this.props;
    return (
      <Row>
        <Col flex={3}>
          <Text>
            {name} / {accepted ? 'true' : 'false'}
          </Text>
        </Col>
        <Col flex={1}>
          <CircleIconButton icon="minus" action={() => console.log(id)} />
        </Col>
      </Row>
    );
  }
}
