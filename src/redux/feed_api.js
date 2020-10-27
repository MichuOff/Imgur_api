import { concat } from 'lodash'

import { updateViral, updateLoading } from "./store";

export const CLIENT_ID = "afc1eafd0214c9d"

export const getViralLogic = (dispatch, page, viral) => {
    fetch(`https://api.imgur.com/3/gallery/hot/viral/${page}?showViral=true&mature=true`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Client-ID ${CLIENT_ID}`,
            "Content-Type": "application/json",
        },
    }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            if (responseData.data) {
                dispatch(updateLoading(false))
                dispatch(updateViral(concat(viral, responseData.data)));
            }
        })
        .done();
};
