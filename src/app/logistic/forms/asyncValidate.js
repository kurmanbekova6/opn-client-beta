import axios from "axios";

const asyncValidate = (values /*, dispatch */) => {
  const { continent, country, zip, clientId } = values;

  if (values.continent && values.country && values.zip) {
    return axios
      .post(`/geo/verify`, {
        clientId,
        continent,
        country,
        code: zip,
      })
      .then(res => {
        if (res.status === 200) {
          if (!res.data.result.continent.status) {
            throw {
              continent: "Check continent",
            };
          }
          if (!res.data.result.country.status) {
            throw {
              country: "Check country",
            };
          }
          if (!res.data.result.code.status) {
            throw { zip: "ZIP code doesn't match to country" };
          }
        }
      });
  } else {
    return new Promise((resolve, reject) => {});
  }
};

export default asyncValidate;
