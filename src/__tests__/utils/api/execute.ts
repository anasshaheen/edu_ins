import axios from 'axios';

import constants from '../constants';

async function execute(
  query: string,
  token: string = '',
  variables: object = {},
) {
  return await axios.post(
    constants.API_URL,
    {
      query,
      variables,
    },
    {
      headers: token
        ? {
            authorization: `bearer ${token}`,
          }
        : {},
    },
  );
}

export default execute;
