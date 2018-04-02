import React, {Component} from 'react';
import {Text, View, Animated} from 'react-native';

class Ball extends Component {

  componentWillMount() {
    this.position = new Animated.ValueXY(0,0);
    Animated.spring(this.position, {
      toValue: {x: 150, y: 150}
    }).start();
  }

  render() {
    return(
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.ball} />
      </Animated.View>
    );
  }
}


const styles = {
  ball: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 50,
    borderColor: 'black'
  }
};

export default Ball;
