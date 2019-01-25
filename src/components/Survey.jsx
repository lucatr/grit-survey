import React from 'react';
import { Heading, Pane, Button, Checkbox } from 'evergreen-ui';
import Config from '../Config';
import db from '../db';
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
    newState.confirmMsg = 'Danke für deine Stimme.';
    return newState;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isConfirmShown: true });

    let data = { ...this.state };
    delete data.isConfirmShown;
    delete data.confirmMsg;
    data.surveyId = 'web';

    db.collection("survey").add({ data })
    .then((docRef) => {
      if (docRef) {
        window.setTimeout(() => this.setState(this.getInitState), 5000);
      }
    })
    .catch((error) => {
      this.setState(() => this.setState({ confirmMsg: `¡Ay, caramba! - ${error}` }))
    });

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
                  { this.state.confirmMsg }
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