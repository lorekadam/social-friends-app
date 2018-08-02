import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Picker, Icon, Item, Input, Content } from 'native-base';

import { Screen, StyledContent } from '../styled/Screen';
import { StyledText, Flex, StatItem, StatsRow } from '../styled/StyledComponents';
import { back } from '../actions/navigationActions';

@connect()
export default class AddGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        home: {},
        away: {}
      }
    };
  }
  onValueChange = (side, element, value) => {
    this.setState({
      game: {
        ...this.state.game,
        [side]: {
          ...this.state.game[side],
          [element]: value
        }
      }
    });
  };
  addNewGame = () => {
    console.log(this.state);
  };
  render() {
    const stats = [
      'Score',
      'shots',
      'shotsOnTarget',
      'possession',
      'tackles',
      'fouls',
      'yellow',
      'red',
      'injuries',
      'offsides',
      'corners',
      'shotsAccuracy',
      'passAccuracy'
    ];
    return (
      <StyledContent>
        <StyledText>Screen</StyledText>
        <Button onPress={() => this.props.dispatch(back())}>
          <StyledText>Back</StyledText>
        </Button>
        <StyledText center>Home / Away</StyledText>
        <StatsRow>
          <StatItem>
            <Item rounded>
              <Input onChangeText={val => this.onValueChange('home', 'team', val)} />
            </Item>
          </StatItem>
          <StatItem>
            <StyledText center>Team</StyledText>
          </StatItem>
          <StatItem>
            <Item rounded>
              <Input onChangeText={val => this.onValueChange('away', 'team', val)} />
            </Item>
          </StatItem>
        </StatsRow>
        {stats.map((stat, i) => (
          <StatsRow key={i}>
            <StatItem>
              <Item rounded>
                <Input
                  keyboardType="numeric"
                  onChangeText={val => this.onValueChange('home', stat, val)}
                />
              </Item>
            </StatItem>
            <StatItem>
              <StyledText center>{stat}</StyledText>
            </StatItem>
            <StatItem>
              <Item rounded>
                <Input
                  keyboardType="numeric"
                  onChangeText={val => this.onValueChange('away', stat, val)}
                />
              </Item>
            </StatItem>
          </StatsRow>
        ))}
        <Button onPress={this.addNewGame} full>
          <StyledText>Add Game</StyledText>
        </Button>
      </StyledContent>
    );
  }
}
