const initialState = {
  newest: [],
  featured: [],
  frequent: [],
  votes: [],
  active: [],
  unansweredNewest: [],
  unansweredMyTags: [],
  unansweredVotes: [],
  unansweredNoAnswer: []
};

// --- Action Types --- //
const UPDATE = "UPDATE";
// --- Reducer --- //

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}

// --- Action Creators --- //

export function update_questions(data) {
  return {
    type: UPDATE,
    payload: data
  };
}
