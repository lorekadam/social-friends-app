import React, { Component } from 'react';
import { TitleDropdown } from '../../styled/TitleDropdown';
import { Feather } from '@expo/vector-icons';
import { Text } from '../../styled/Text';
import colors from '../../styled/colors';
import { CircleButton } from '../../styled/Buttons';
import { Row } from '../../styled/Grid';

interface Props {
  active: boolean;
  action(): void;
  icon: string;
  title: string;
  badge?: number;
}

export default class AccordionHeadline extends Component<Props, {}> {
  render() {
    const { active, action, icon, title, badge } = this.props;
    return (
      <TitleDropdown active={active} onPress={() => action()}>
        <Row>
          <Feather
            color={colors.light2}
            size={16}
            name={icon}
            style={{ marginRight: 10 }}
          />
          <Text size={16}>{title}</Text>
        </Row>
        {badge !== undefined && badge > 0 && (
          <CircleButton size={18}>
            <Text size={14}>{badge > 99 ? 99 : badge}</Text>
          </CircleButton>
        )}
      </TitleDropdown>
    );
  }
}
