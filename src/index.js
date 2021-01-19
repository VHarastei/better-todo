/* eslint-disable import/no-cycle */
import { createProject, createTask } from './mainFunctions';
import { renderProject, renderHeader, renderTask } from './renderFunctions';

/* eslint-disable-next-line import/no-mutable-exports */
let projectList = [];

if (localStorage.getItem('projectList') == null) {
  createProject('Project 1', 'Some description of project one');
  createProject('Project 2', 'Some description of project two');
  createProject('Project ToDo', 'Some description of project three');

  createTask('medium', 'add localStorage', '2021-01-22');
  createTask('low', 'add edit functionality', '2021-01-31');

  renderProject();
  renderHeader();
  renderTask();
} else {
  projectList = JSON.parse(window.localStorage.getItem('projectList'));
  renderProject();
  renderHeader();
  renderTask();
}

// eslint-disable-next-line import/prefer-default-export
export { projectList };
