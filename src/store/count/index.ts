const countStore = valtio({
  count: 0,
});

export * as countActions from './actions';
export default countStore;
