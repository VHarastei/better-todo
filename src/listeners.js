/* eslint-disable import/no-cycle */

import {
  deleteProject, switchActiveProject, completeTask, inCompleteTask, deleteTask, setLocalStorage,
} from './mainFunctions';
import { createProjectDom, createTaskDom } from './domFunctions';

(() => {
  createProjectDom.addProjectBnt.addEventListener('click', createProjectDom.show);
  createProjectDom.cancelProjectFormBnt.addEventListener('click', createProjectDom.hide);
  createProjectDom.formProject.addEventListener('submit', (e) => {
    e.preventDefault();
    createProjectDom.addProject();
    setLocalStorage();
    // console.log(window.localStorage.getItem('projectList'));
  });

  createTaskDom.addTaskBnt.addEventListener('click', createTaskDom.show);
  createTaskDom.cancelTaskFormBnt.addEventListener('click', createTaskDom.hide);
  createTaskDom.formTask.addEventListener('submit', (e) => {
    e.preventDefault();
    createTaskDom.addTask();
  });
})();

function projectActionListeners() {
  const divProjectCollection = document.querySelectorAll('.project-item');
  divProjectCollection.forEach((button) => button.addEventListener('click', (e) => {
    const target = (e.target.className === 'project-name') ? e.target.parentNode : e.target;
    if (target.className !== 'project-close') {
      switchActiveProject(target.dataset.value);
    }
  }));

  const closeDivCollection = document.querySelectorAll('.project-close');
  closeDivCollection.forEach((button) => button.addEventListener('click', (e) => {
    deleteProject(e.target.parentNode.dataset.value);
  }));
}

function taskActionListeners() {
  const divCheckboxCollection = document.querySelectorAll('.task-checkbox');
  divCheckboxCollection.forEach((button) => button.addEventListener('click', (e) => {
    completeTask(e.target.parentNode.dataset.value);
    if (e.target.classList.contains('task-complete')) {
      inCompleteTask(e.target.parentNode.dataset.value);
    }
  }));

  const closeDivCollection = document.querySelectorAll('.task-close');
  closeDivCollection.forEach((button) => button.addEventListener('click', (e) => {
    deleteTask(e.target.parentNode.parentNode.dataset.value);
  }));
}
// staticListeners
export { projectActionListeners, taskActionListeners };
