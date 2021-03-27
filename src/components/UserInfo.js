export class UserInfo {
  constructor({ userNameSelector, userSublineSelector }) {
    this._name = userNameSelector;
    this._about = userSublineSelector;
    this._avatar = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return this._userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._about.textContent = userInfo.about;
    this._avatar.alt = `Аватар ${userInfo.name}`;
    this.userId = userInfo._id;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
