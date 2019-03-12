export const getRouteName = (state: {
  routes: { key: string }[];
  index: number;
}) => state.routes[state.index].key;
