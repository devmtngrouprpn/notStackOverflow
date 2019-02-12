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
  unansweredNoAnswer: [],
  frequent_total: 0,
  featured_total: 0,
  total: 0,
  unansweredNewest_total: 0,
  unansweredNoAnswer_total: 0,
  unansweredVotes_total: 0,
  description: ""
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
