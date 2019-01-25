import React from 'react';
import { Dialog, SelectField } from 'evergreen-ui';
import Config from '../Config';
import db from '../db';
import ReactChartkick, { BarChart } from 'react-chartkick'
import Chart from 'chart.js'

export default class Result extends React.Component {
  
  constructor() {
    super();
    this.state = {
      data: [],
      graphData: [],
      isShown: window.location.search.substring(1) === 'results',
      surveyId: 'gritcon',
    }
    ReactChartkick.addAdapter(Chart);
    this._getData();
  }

  _getData() {
    const results = [];
    db.collection('survey').get().then(snapshot => {
      snapshot.forEach(record => results.push(record.data().data));
      this.setState((state) => ({
        data: results,
        graphData: this._processData(results, state.surveyId),
      }));
    });
  }

  _processData(data, surveyId) {
    const resultProcessed = {};
    Config.options.forEach(option => resultProcessed[option.id] = 0);
    data.filter(record => record.serveyId === surveyId).forEach(record => {
      Object.keys(record).forEach(key => {
        if (key !== 'serveyId' && record[key]) {
          resultProcessed[key] += 1;
        }
      });
    });
    return this._transformDataForGraph(resultProcessed);
  }

  _transformDataForGraph(data) {
    const resultTransformed = [];
    Object.keys(data).forEach(key => {
      const label = Config.getLabelById(key);
      resultTransformed.push([label, data[key]]);
    });
    resultTransformed.sort((a, b) => b[1] - a[1]);
    return resultTransformed;
  }

  refreshGraphData = (surveyId) => {
    this.setState((state) => ({
      graphData: this._processData(state.data, surveyId),
      surveyId: surveyId,
    }));
  }

  render() {
    return (
      <Dialog
        isShown={this.state.isShown}
        hasFooter={false}
        title="Survey Results"
        onCloseComplete={() => this.setState({ isShown: false })}
      >
        <SelectField 
          value={this.state.surveyId} 
          onChange={event => this.refreshGraphData(event.target.value)}
          label={'Survey'}
        >
          <option value="gritcon">GRITcon</option>
          <option value="web">Web</option>
        </SelectField>
        <BarChart data={ this.state.graphData } />
      </Dialog>
    );
  }
}