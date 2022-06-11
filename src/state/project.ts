import {Project} from '../models/project.js';
import {ProjectStatus} from '../models/project.js';
//Project State Management
type Listener<T> = (item: T[]) => void

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listener: Listener<T>): void {
    this.listeners.push(listener);
  }
}

class ProjectState extends State<Project> {
  private project: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number): void {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.project.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newState: ProjectStatus) {
    const project = this.project.find(prj => prj.id === projectId);
    if (project && project.status !== newState) {
      project.status = newState;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.project.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();