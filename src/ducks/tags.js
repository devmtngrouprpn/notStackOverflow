const initialState = {
  popular: [],
  name: [],
  active: [],
  frequent: [],
  featured: [],
  newest: [],
  votes: [],
  unansweredNewest: [],
  unansweredVotes: [],
  unansweredNoAnswer: []
};

// --- Action Types --- //

const SET_TAGS = "SET_TAGS";

// --- Reducer --- //

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TAGS:
      console.log("reducer", action.payload);
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}

// --- Action Creators --- //
export function setTags(data) {
  return {
    type: SET_TAGS,
    payload: data
  };
}
