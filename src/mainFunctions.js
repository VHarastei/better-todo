/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint-disable import/no-cycle */

import { projectList } from './index';
import { renderProject, renderHeader, renderTask } from './renderFunctions';

function createProject(name, description) {
  inActiveProjects();
  projectList.push({
    name,
    description,
    tasks: [],
    active: true,
  });
  createTask('medium', 'Default task', '2021-01-17');
  setLocalStorage();
  renderProject();
  renderHeader();
  renderTask();
}

function activeProject() {
  return projectList.filter((project) => project.active)[0];
}

function inActiveProjects() {
  projectList.forEach((project) => {
    // eslint-disable-next-line no-param-reassign
    project.active = false;
  });
}

function deleteProject(index) {
  if (projectList.length > 1) {
    if (index !== 0) {
      switchActiveProject(index - 1);
      projectList.splice(index, 1);
    } else {
      switchActiveProject(1);
      projectList.splice(0, 1);
    }
  }
  // else {
  //     projectList.splice(index, 1)
  // }
  setLocalStorage();
  renderProject();
  renderHeader();
  renderTask();
}

function switchActiveProject(index) {
  inActiveProjects();
  projectList[index].active = true;
  setLocalStorage();
  renderProject();
  renderHeader();
  renderTask();
}

function createTask(priority, name, date) {
  activeProject().tasks.push({
    priority,
    name,
    date,
    complete: false,
  });
  setLocalStorage();
  renderTask();
}

function completeTask(index) {
  activeProject().tasks[index].complete = true;
  setLocalStorage();
  renderTask();
}

function inCompleteTask(index) {
  activeProject().tasks[index].complete = false;
  setLocalStorage();
  renderTask();
}

function deleteTask(index) {
  activeProject().tasks.splice(index, 1);
  setLocalStorage();
  renderTask();
}

function setLocalStorage() {
  window.localStorage.setItem('projectList', JSON.stringify(projectList));
}
export {
  createProject,
  activeProject,
  inActiveProjects,
  deleteProject,
  switchActiveProject,
  createTask,
  completeTask,
  inCompleteTask,
  deleteTask,
  setLocalStorage,
};
