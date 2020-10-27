import { concat } from 'lodash'

import { updateViral, updateLoading } from "./store";

export const CLIENT_ID = "afc1eafd0214c9d"
// export const CLIENT_SECRET = "5cc0ae8cce04a375a2bece7e912a27f063d62ccc"

export const getViralLogic = (dispatch, page, viral) => {
  fetch(`https://api.imgur.com/3/gallery/hot/viral/year/${page}?showViral=true&mature=false&album`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      'Authorization': `Client-ID ${CLIENT_ID}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.data) {
        dispatch(updateLoading(false))
        dispatch(updateViral(concat(viral, responseData.data)));
      }
    })
    .done();
};