const initialState = {
  interesting: {},
  featured: {},
  hot: {},
  week: {},
  month: {}
};

// --- Action Types --- //
const INTERESTING = "INTERESTING";
const FEATURED = "FEATURED";
const HOT = "HOT";
const WEEK = "WEEK";
const MONTH = "MONTH";
// --- Reducer --- //

export default function(state = initialState, action) {
  switch (action.type) {
    case INTERESTING:
      return { ...state, interesting: action.payload };
    case FEATURED:
      return { ...state, featured: action.payload };
    case HOT:
      return { ...state, hot: action.payload };
    case WEEK:
      return { ...state, week: action.payload };
    case MONTH:
      return { ...state, month: action.payload };
    default:
      return { state };
  }
}

// --- Action Creators --- //
export function update_interesting(interesting) {
  return {
    type: INTERESTING,
    payload: interesting
  };
}
export function update_featured(featured) {
  return {
    type: FEATURED,
    payload: featured
  };
}
export function update_hot(hot) {
  return {
    type: HOT,
    payload: hot
  };
}
export function update_week(week) {
  return {
    type: WEEK,
    payload: week
  };
}
export function update_month(month) {
  return {
    type: MONTH,
    payload: month
  };
}
