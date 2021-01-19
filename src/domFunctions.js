/* eslint-disable import/no-cycle */
/* eslint no-use-before-define: ["error", { "functions": false }] */
import { createProject, createTask } from './mainFunctions';

const createProjectDom = (() => {
  const ProjectPopUp = document.querySelector('.project-input-pop-up');
  const addProjectBnt = document.querySelector('.add-project-button');
  const cancelProjectFormBnt = document.querySelector('.cancel-project-form-button');
  const formProject = document.querySelector('.project-input-form');

  function show() {
    ProjectPopUp.style.display = 'flex';
  }
  function hide() {
    ProjectPopUp.style.display = 'none';
  }
  function clear() {
    formProject.reset();
  }

  function addProject() {
    createProject(
      formProject.name.value,
      formProject.description.value,
    );

    hide();
    clear();
  }

  return {
    show,
    hide,
    addProject,
    addProjectBnt,
    cancelProjectFormBnt,
    formProject,
  };
})();

const createTaskDom = (() => {
  const TaskPopUp = document.querySelector('.task-input-pop-up');
  const addTaskBnt = document.querySelector('.add-task-button');
  const cancelTaskFormBnt = document.querySelector('.cancel-task-form-button');
  const formTask = document.querySelector('.task-input-form');

  function show() {
    TaskPopUp.style.display = 'flex';
  }
  function hide() {
    TaskPopUp.style.display = 'none';
    clear();
  }
  function clear() {
    formTask.reset();
  }

  function addTask() {
    createTask(
      formTask.priority.value,
      formTask.name.value,
      formTask.date.value,
    );
    hide();
    clear();
  }

  return {
    show,
    hide,
    addTask,
    addTaskBnt,
    cancelTaskFormBnt,
    formTask,
  };
})();

export { createProjectDom, createTaskDom };
