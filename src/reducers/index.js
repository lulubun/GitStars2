import * as actions from '../actions/index';
import 'isomorphic-fetch';


const initialRepositoryState = [];

export const repositoryReducer = (state=initialRepositoryState, action) => {
  if (action.type === actions.ADD_REPOSITORY) {
    return [...state, {
      name: action.repository,
      rating: null
    }];
  }
  else if (action.type === actions.RATE_REPOSITORY) {
    // Find the index of the matching repository
    const index = state.findIndex(repository =>
      repository.name === action.repository
    );

    if (index === -1) {
      throw new Error('Could not find repository');
    }

    const before = state.slice(0, index);
    const after = state.slice(index + 1);
    const newRepository = Object.assign({}, state[index], {rating: action.rating});
    return [...before, newRepository, ...after];
  }
  else if (action.type === actions.FETCH_DESCRIPTION_SUCCESS) {
    // Find the index of the matching repository
    const index = state.findIndex(repository =>
      repository.name === action.repository
    );

    if (index === -1) {
      throw new Error('Could not find repository');
    }

    const before = state.slice(0, index);
    const after = state.slice(index + 1);
    const newRepository = Object.assign({}, state[index], {
      description: action.description
    });
    return [...before, newRepository, ...after];
  }
  else if (action.type === actions.FETCH_DESCRIPTION_ERROR) {
    // Find the index of the matching repository
    const index = state.findIndex(repository =>
      repository.name === action.repository
    );

    if (index === -1) {
      throw new Error('Could not find repository');
    }

    const before = state.slice(0, index);
    const after = state.slice(index + 1);
    const newRepository = Object.assign({}, state[index], {
      description: 'N/A'
    });
    return [...before, newRepository, ...after];
  }

  return state;
};


export const fetchDescription = repository => dispatch => {
    const url = `https://api.github.com/repos/${repository}`;
    return fetch(url).then(response => {
        if (!response.ok) {
            const error = new Error(response.statusText)
            error.response = response
            throw error;
        }
        return response;
    })
    .then(response => response.json())
    .then(data =>
        dispatch(fetchDescriptionSuccess(repository, data.description))
    )
    .catch(error =>
        dispatch(fetchDescriptionError(repository, error))
    );
};
