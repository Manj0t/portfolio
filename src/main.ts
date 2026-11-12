import './styles/main.css';

import { projects } from './data/projects';
import { experiments } from './data/experiments';
import { experience } from './data/experience';
import { involvement } from './data/involvement';
import { skills } from './data/skills';

import { renderProjects } from './components/projects';
import { renderExperiments } from './components/experiments';
import { renderExperience } from './components/experience';
import { renderMarquee } from './components/marquee';

import { mount } from './lib/dom';
import { initTheme } from './lib/theme';
import { initNav } from './lib/nav';
import { initReveal } from './lib/reveal';
import { initAccordion } from './lib/accordion';
import { initParallax } from './lib/parallax';
import { initAlive } from './lib/alive';

function render(): void {
  const projectList = mount('#projectList');
  if (projectList) renderProjects(projectList, projects);

  const experimentGrid = mount('#experimentGrid');
  if (experimentGrid) renderExperiments(experimentGrid, experiments);

  const experienceList = mount('#experienceList');
  if (experienceList) renderExperience(experienceList, experience);

  const involvementList = mount('#involvementList');
  if (involvementList) renderExperience(involvementList, involvement);

  const skillTrack = mount('#skillTrack');
  if (skillTrack) renderMarquee(skillTrack, skills);
}

function enhance(): void {
  // Order matters: content first, then anything that measures it.
  initTheme();
  initNav();
  initAccordion();
  initReveal();
  initParallax();
  initAlive();
}

render();
enhance();
