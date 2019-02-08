const initialState = {
  auth_id: "",
  username: "",
  user_created: "",
  user_first_last: "",
  personal_site: "",
  loaction: "",
  facebook: "",
  it_hub: "",
  twitter: "",
  occupation: "",
  bio: "",
  tags_watching: [],
  user_views: 0,
  last_logout: "",
  picture: "",
  favorites: []
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
export function update_home(data) {
  return {
    type: UPDATE,
    payload: data
  };
}
