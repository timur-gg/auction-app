import React, { useState, useEffect } from 'react';
import { Text } from '@mantine/core';

function Countdown(initialSeconds: number) {
  const [seconds, setSeconds] = React.useState(initialSeconds);

  useEffect(() => {
    //Implementing the setInterval method
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        return () => clearInterval(timer);
      }
    }, 1000);

    //Clearing the interval
    return () => clearInterval(timer);
  }, [seconds]);

  //   componentDidMount(){
  //     this.timer = setInterval(this.tick, 1000);
  //   }

  //   function tick(){
  //     if (seconds > 0) {
  //         setSeconds({seconds - 1})
  //     } else {
  //       clearInterval(this.timer);
  //       window.location.reload();
  //     }
  //   }

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <Text size="lg">
        {mins < 1 && '0'}
        {mins}:{secs < 10 && '0'}
        {secs}
      </Text>
    </div>
  );
}

export default Countdown;
