import React from "react";
import Spinner from "../../common/spinner/Spinner";

const ProfileLogo = props => {
  const { src, alt, customClass, isLoading = false } = props;
  return (
    <div className={`profileLogoWrapper ${customClass}`}>
      {isLoading ? <Spinner size="small" /> : <img src={src} alt={alt} />}
    </div>
  );
};

export default ProfileLogo;
