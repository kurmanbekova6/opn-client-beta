import React, { Component } from "react";
import AccountSettingsItem from "./AccountSettingsItem";

class AccountSettingsPersonal extends Component {
  state = {};
  removeDocument = () => {};
  render() {
    const { personalInfo, editTextField } = this.props;
    return (
      <div className="account-settings__company">
        <AccountSettingsItem
          name="fullName"
          label="Full name"
          value={personalInfo.fullName}
          editField={editTextField}
        />
        <AccountSettingsItem
          name="userPhone"
          label="Phone"
          value={personalInfo.userPhone}
          editField={editTextField}
        />
        {/*<AccountSettingsItem*/}
        {/*  name="password"*/}
        {/*  label="Password"*/}
        {/*  value={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}*/}
        {/*  editField={editTextField}*/}
        {/*/>*/}
        <AccountSettingsItem
          name="position"
          label="Position"
          value={personalInfo.position}
          editField={editTextField}
        />

        <AccountSettingsItem
          name="userEmail"
          label="Corporate email"
          value={personalInfo.userEmail}
          editField={editTextField}
        />
      </div>
    );
  }
}

export default AccountSettingsPersonal;
