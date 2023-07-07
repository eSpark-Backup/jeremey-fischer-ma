import { hookstate } from '@hookstate/core';

type Modals = {
  search: boolean;
};

const modalState = hookstate<Modals>({
  search: false,
});

export default modalState;
