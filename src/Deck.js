import React, {Component} from 'react';
import {View, Animated, PanResponder, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_DURING = 2;

class Deck extends Component {

  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder:() => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({x:gesture.dx,y:gesture.dy})
      },

      onPanResponderRelease: (event, gesture) => {

        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');

        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
          console.log('to left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position }
  }

  forceSwipe(direction) {
    console.log('direction: ',direction);
    const x = direction === 'right' ? SCREEN_WIDTH*2 : -SCREEN_WIDTH*2;
    console.log('x: ',x);
    Animated.timing(this.state.position, {
      toValue: {x, y: 0},
      duration: SWIPE_DURING
    });

    console.log('SCREEN_WIDTH: ',SCREEN_WIDTH);
    console.log('position',this.state.position);

  }

  resetPosition() {

    Animated.spring(this.state.position, {
      toValue: {x: 0, y: 0}
    }).start();

  }

  getCardStyle() {
    const {position} = this.state;
    const rotate = position.x.interpolate({

      inputRange: [-SCREEN_WIDTH*1.5,0,SCREEN_WIDTH*1.5],
      outputRange: ['-90deg','0deg','90deg']
    });

    return {
      ...position.getLayout(),
      transform: [{rotate}]
    };
  }

  renderCards() {
    return this.props.data.map((item,index) => {

        if (index === 5 ) {
          return (
            <Animated.View
              key={item.id}
              {...this.state.panResponder.panHandlers}
              style={this.getCardStyle()}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          );

        } else {
          {this.props.renderCard(item)}
        }
  });
}

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;
