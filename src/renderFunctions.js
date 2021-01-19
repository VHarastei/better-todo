/* eslint-disable import/no-cycle */

import moment from 'moment';
import { projectList } from './index';
import { activeProject } from './mainFunctions';
import { projectActionListeners, taskActionListeners } from './listeners';

function renderProject() {
  const projectsContainer = document.querySelector('.projects-container');

  function clear() {
    projectsContainer.innerHTML = '';
  }
  clear();
  projectList.forEach((project, index) => {
    const divProject = document.createElement('div');
    divProject.classList.add('project-item');
    divProject.dataset.value = index;

    const divProjectName = document.createElement('div');
    divProjectName.classList.add('project-name');
    divProjectName.innerText = project.name;

    const divProjectDeleteBtn = document.createElement('div');
    divProjectDeleteBtn.classList.add('project-close');
    divProjectDeleteBtn.innerText = '✖';

    if (project.active) {
      divProject.classList.add('active');
    }

    divProject.appendChild(divProjectName);
    divProject.appendChild(divProjectDeleteBtn);
    projectsContainer.appendChild(divProject);
  });

  projectActionListeners();
}

function renderHeader() {
  const headerProject = document.querySelector('.main-header');

  function clear() {
    headerProject.childNodes.forEach((child) => {
      // eslint-disable-next-line no-param-reassign
      child.innerText = '';
    });
  }
  clear();

  const headerProjectName = document.querySelector('.main-project-name');
  headerProjectName.innerText = activeProject().name;

  const headerProjectDescription = document.querySelector('.main-project-description');
  headerProjectDescription.innerText = activeProject().description;
}

function renderTask() {
  const taskContainer = document.querySelector('.tasks-container');

  function clear() {
    taskContainer.innerHTML = '';
  }

  clear();

  activeProject().tasks.forEach((task, index) => {
    const divTask = document.createElement('div');
    divTask.classList.add('task-item');
    divTask.dataset.value = index;

    const divTaskCheckbox = document.createElement('div');
    divTaskCheckbox.classList.add('task-checkbox');
    if (task.priority === 'low') divTaskCheckbox.classList.add('priority-low');
    if (task.priority === 'medium') divTaskCheckbox.classList.add('priority-medium');
    if (task.priority === 'high') divTaskCheckbox.classList.add('priority-high');

    if (task.complete === true) {
      divTaskCheckbox.classList.add('task-complete');
    }

    const divTaskName = document.createElement('div');
    divTaskName.classList.add('task-name');
    divTaskName.innerText = task.name;

    const divTaskAlignContainer = document.createElement('div');
    divTaskAlignContainer.classList.add('task-align-container');

    const divTaskDate = document.createElement('div');
    divTaskDate.classList.add('task-date');
    divTaskDate.innerText = moment(task.date, 'YYYY-MM-DD').fromNow();

    const divTaskClose = document.createElement('div');
    divTaskClose.classList.add('task-close');
    divTaskClose.innerText = '✖';

    divTaskAlignContainer.appendChild(divTaskDate);
    divTaskAlignContainer.appendChild(divTaskClose);

    divTask.appendChild(divTaskCheckbox);
    divTask.appendChild(divTaskName);
    divTask.appendChild(divTaskAlignContainer);

    taskContainer.appendChild(divTask);
  });

  taskActionListeners();
}

export { renderProject, renderHeader, renderTask };
