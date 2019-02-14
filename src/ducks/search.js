const initialState = {
  questions: [],
  searchString: "",
  total: 0
};

// actions

const SET_RESULTS = "SET_RESULTS";

// reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_RESULTS:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}

// action creators

export function setResults(data) {
  return {
    type: SET_RESULTS,
    payload: data
  };
}
