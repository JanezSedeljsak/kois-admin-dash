export const geod = (state = {}, action) => {
  switch (action.type) {
    case "ACTIVATE_GEOD":
      return action.geod;
    case "CLOSE_GEOD":
      return {};
    default:
      return state;
  }
};

export const reducers = combineReducers({
  geod
});
