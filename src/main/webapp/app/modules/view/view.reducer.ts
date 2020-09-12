export const ACTION_TYPES = {
  WEBSOCKET_POSITION_MESSAGE: 'view/WEBSOCKET_POSITION_MESSAGE',
};

const initialState = {
  loading: false,
  errorMessage: null,
  positions: {
    data: [],
  },
};

export type ViewState = Readonly<typeof initialState>;

// Reducer

export default (state: ViewState = initialState, action): ViewState => {
  switch (action.type) {
    case ACTION_TYPES.WEBSOCKET_POSITION_MESSAGE: {
      let data = state.positions.data.filter(item => {
        return !(
          item.account === action.payload.account &&
          item.productId === action.payload.productId &&
          item.currency === action.payload.currency
        );
      });
      data = [...data, action.payload];
      return {
        ...state,
        positions: { data },
      };
    }
    default:
      return state;
  }
};
