import AssetId from './AssetId';
import Logger from './Logger';

/**
 * Class representing a Project.
 */
class Project {
  /**
   * constructor - Project Object constructor
   *
   * @param  {string} name              Name of the project
   * @param  {Object} paths             File Paths
   * @param  {function} sendToRenderer  Function to send project to the Render Screen
   * @returns {Project}                 Project Object
   */
  constructor(name, paths, sendToRenderer) {
    this._name = name;
    this._path = paths["path"];
    this._pathTypes = {
      "asset": {
        scene: new AssetId(paths["asset"]["scene"], this._path, () => this.formatForRender()),
        render: new AssetId(paths["asset"]["render"], this._path, () => this.formatForRender()),
        cache: new AssetId(paths["asset"]["cache"], this._path, () => this.formatForRender()),
        texture: new AssetId(paths["asset"]["texture"], this._path, () => this.formatForRender())
      },
      "shot": {
        scene: new AssetId(paths["shot"]["scene"], this._path, () => this.formatForRender()),
        render: new AssetId(paths["shot"]["render"], this._path, () => this.formatForRender()),
        cache: new AssetId(paths["shot"]["cache"], this._path, () => this.formatForRender()),
        texture: new AssetId(paths["shot"]["texture"], this._path, () => this.formatForRender())
      }
    }

    this._pathType = "asset";
    this._pathSubType = "scene"

    this._sendToRenderer = sendToRenderer;
  }


  /**
   * set pathType - pathType setter
   *
   * @param  {string} pathType "asset" or "shot"
   * @returns {void}             void
   */
  set pathType(pathType) {
    this._pathType = pathType;
    let assetId = this._pathTypes[this._pathType][this._pathSubType];
    assetId.clearValues("project");
    assetId.setSearchDir("project");
    assetId.searchNext();
  }


  /**
   * set pathSubType - pathSubType setter
   *
   * @param  {string} pathSubType "scene", "render", "texture" or "cache"
   * @returns {void}             void
   */
  set pathSubType(pathSubType) {
    this._pathSubType = pathSubType
    let assetId = this._pathTypes[this._pathType][this._pathSubType];
    assetId.clearValues("project");
    assetId.setSearchDir("project");
    assetId.searchNext();
  }


  /**
   * setDimension - set the dimension of the current used AssetId of the project
   *
   * @param  {string} dimension "3d" or "2d"
   * @returns {void}           void
   */
  setDimension(dimension) {
    this._pathTypes[this._pathType][this._pathSubType].setDimension(dimension);
  }


  /**
   * getData - Get the files/directories found for the current selected AssetId of the project
   *
   * @returns {type}  description
   */
  getData() {
    assetId.searchNext();
  }


  /**
   * formatForRender - Format the data of the project into an Object to send to the Render Screen
   *
   * @returns {void}  void   
   */
  formatForRender() {
    let directories = {};
    let dirOrder = [];
    let groups = {};

    let assetId = this._pathTypes[this._pathType][this._pathSubType];
    directories = assetId.directories;
    dirOrder = assetId.directoriesOrder;
    groups = assetId.groups;

    let asset = {
      project: this._name,
      pathType: this._pathType,
      pathSubType: this._pathSubType,
      groups: groups,
      directories: directories,
      directoriesOrder: dirOrder
    }
    //   let asset = {
    //     sid:         this.sid,
    //
    //     path:        this.path,
    //     pathSubType: this._pathSubType,
    //
    //     projects:    this.projects,
    //     project:     this.projectName,
    //     projectPath: this.project,
    //     pathType:    this.pathType,
    //     dimension:   this.dimension,
    //     group:       this.group == "<>" ? "" : this.group,
    //     name:        this.name == "<>" ? "" : this.name,
    //     task:        this.task == "<>" ? "" : this.task,
    //     subtask:     this.subtask == "<>" ? "" : this.subtask,
    //     file:        this.formatFile == "<>" ? "" : this.formatFile,
    //
    //     groups:      this.groups,
    //     names:       this.names,
    //     tasks:       this.tasks,
    //     subtasks:    this.subtasks,
    //     files:       this.formatFiles(),
    //   }
    //
    this._sendToRenderer(asset);
    // }
  }
}

export default Project
