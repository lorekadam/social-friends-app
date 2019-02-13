export const getRouteName = (state: {
  routes: { key: string }[];
  index: number;
}) => {
  return state.routes[state.index].key;
};
