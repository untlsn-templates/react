const countStore = valtio({
  count: 0,
});

valtioInspect({ count: countStore });

export * as countActions from './actions';
export default countStore;
