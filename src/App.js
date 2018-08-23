import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class App extends Component {
  state = {
    playing: false,
    tempo: 100,
    beat: 1,
    channel1Pattern: [
      {sampleOn: true},
      {sampleOn: false},
      {sampleOn: true},
      {sampleOn: false},
      {sampleOn: true},
      {sampleOn: false}
    ]
  };

  playSample = () => {
    let bd = document.querySelector('#bd1');
    if(this.state.channel1Pattern[this.state.beat - 1].sampleOn === true) {
      if(!bd.paused) bd.currentTime = 0;
      else bd.play();
      console.log('played');
    }
    if (this.state.playing) {
      this.playSong();
      this.state.beat >= this.state.channel1Pattern.length ? this.setState({beat: 1}) : this.setState({beat: this.state.beat + 1})
    }
  };

  toggleSample = (event) => {
    let btnClickedIndex = (event.target.id.substring(3));
    console.log(btnClickedIndex);
    this.setState((prevState) => {
      let newPattern = prevState.channel1Pattern;
      newPattern[btnClickedIndex].sampleOn = !prevState.channel1Pattern[btnClickedIndex].sampleOn;
      console.log(newPattern);
      return {channel1Pattern: newPattern};
    });
  };

  togglePlaySong = () => {
    if(!this.state.playing) this.playSong();
    this.setState((prevState) => {
      return {playing: !prevState.playing}
    });
  };

  playSong = () => {
    setTimeout(this.playSample, 60000 / this.state.tempo);
  };

  handleOnChange = (value) => {
    this.setState({
      tempo: value
    })
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.playSample}>Test</button>
        <br/>
        {this.state.channel1Pattern.map((button, index) =>
          <button id={`btn${index}`}
                  key={index}
                  value={button.sampleOn}
                  style={{
                    backgroundColor: button.sampleOn ? 'green' : 'grey',
                    width: '50px'
                  }}
                  onClick={this.toggleSample.bind(this)}>
            {(button.sampleOn) ? 'on' : 'off'}
          </button>
        )}
        <br/>
        <br/>
        <p>{this.state.beat}</p>
        <button id='play' onClick={this.togglePlaySong}>{!this.state.playing ? 'play' : 'stop'}</button>
        <br/>
        <Slider value={this.state.tempo}
                min={10}
                max={300}
                onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default App;
