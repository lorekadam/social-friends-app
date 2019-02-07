import React, { Component } from 'react';
import { TitleDropdown } from '../../styled/TitleDropdown';
import { Feather } from '@expo/vector-icons';
import { Text } from '../../styled/Text';
import colors from '../../styled/colors';

interface Props {
  active: boolean;
  action(): void;
  icon: string;
  title: string;
}

export default class AccordionHeadline extends Component<Props, {}> {
  render() {
    const { active, action, icon, title } = this.props;
    return (
      <TitleDropdown active={active} onPress={() => action()}>
        <Feather
          color={colors.light2}
          size={16}
          name={icon}
          style={{ marginRight: 10 }}
        />
        <Text size={16}>{title}</Text>
      </TitleDropdown>
    );
  }
}
