import { combineReducers } from 'redux';
import riskProfilesList from './riskProfilesList';
import riskMatrix from './riskMatrix';
import modal from './modal';
import keywordsViewer from './keywordsViewer';
import riskStreamList from './riskStreamList';
import knowledgeTree from './knowledgeTree';
import majorCapitalProjects from './majorCapitalProjects';
import app from './app';

const irisApp = combineReducers({
  riskProfilesList,
  riskMatrix,
  modal,
  keywordsViewer,
  riskStreamList,
  knowledgeTree,
  majorCapitalProjects,
  app
});

export default irisApp;