import countStore from '~/store/count/index';

export const increment = () => {
  countStore.count++;
};
