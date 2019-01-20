import React from 'react';
import axios from 'axios';
import { Heading, Pane, Button, Checkbox } from 'evergreen-ui';
import Config from '../Config';
import './survey.css';

export default class Survey extends React.Component {
  
  constructor() {
    super();
    this.state = this.getInitState();
  }

  getInitState() {
    const newState = {};
    Config.options.forEach(o => newState[o.id] = false);
    newState.isConfirmShown = false;
    return newState;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isConfirmShown: true });

    window.setTimeout(() => this.setState(this.getInitState), 5000);

    // const url = 'dummy';
    // const data = JSON.stringify({text: `${this.state.name} (${this.state.email}), ${'dummy'}:\n${this.state.message}`});
    // axios.post(url, data)
    // .then(() => {
    //   // handle success
    //   this.setState({
    //     name: '',
    //     email: '',
    //     message: '',
    //     validName: null,
    //     validEmail: null,
    //     validMessage: null,
    //   });
    //   toaster.success('Cool, es freut uns dich an Bord zu haben! Wir melden uns bei dir.');
    // })
    // .catch((error) => {
    //   // handle error
    //   toaster.danger('Das hat leider nicht geklappt. Versuch\'s doch bitte nochmal, oder kontaktiere uns via E-Mail: info@grit.rocks');
    // });
  };

  render() {
    return (
      <div id='scalearea'>
      <Pane>
        <Pane
          backgroundColor={"#0077B1"}
          width={"100%"}
          paddingTop={48}
          margin={"auto"}
          paddingBottom={24}
          marginBottom={24}
          textAlign={"center"}
        >
          <Pane
            maxWidth={700}
            margin="auto"
          >
            <Heading 
              size={900}
              fontSize={52}
              color={"#fcfcfc"}
              marginBottom={16}
            >
              GRITcon Umfrage
            </Heading>
            <Heading 
              size={900}
              color={"#fcfcfc"}
            >
              Uns interressiert was dich interressiert.
            </Heading>
          </Pane>
        </Pane>
        <Pane
          margin="auto"
          width={700}
        >
        <form onSubmit={this.handleSubmit}>

          <div className="formSection">
          {Config.options.map(o => (
            <div className='chkbox' key={o.id}>
              <Checkbox
                className={'scale'}
                label={o.label}
                width={350}
                checked={this.state[o.id]}
                onChange={e => this.setState({ [o.id]: e.target.checked })}
              />
            </div>
          ))}
          {this.state.isConfirmShown && 
            <div id={'confirmDialog'} className={'modal'}>
              <div className={'modalContent'}>
                <Heading 
                  size={900}
                  fontSize={52}
                >
                  Danke für deine Stimme.
                </Heading>
                <div id='logo'></div>
              </div>
            </div>
          }
          <Pane
            display="flex"
            justifyContent="center"
            marginTop={48}
          >
            <Button 
              appearance="primary"
              height={100}
              fontSize={35}
              type="submit"
              disabled={this.state.isConfirmShown}
              backgroundImage={'none'}
              backgroundColor={'#0077B1'}
              borderRadius={8}
            >
              {'Submit'}
            </Button>
          </Pane>
          </div>
        </form>
        </Pane>
      </Pane>
      </div>
    );
  }
}