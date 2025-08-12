export class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._job = data.job;
    this._nameContainer = document.querySelector(data.name);
    this._jobContainer = document.querySelector(data.job);
  }

  getUserInfo() {
    const userObject = {
      userName: this._nameContainer.textContent,
      userJob: this._jobContainer.textContent,
    };
    return userObject;
  }

  setUserInfo(newUserName, newUserJob) {
    this._nameContainer.textContent = newUserName;
    this._jobContainer.textContent = newUserJob;
  }
}
