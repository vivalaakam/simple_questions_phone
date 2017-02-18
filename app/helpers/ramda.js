import R from 'ramda';

export const merge = (state, data) => R.merge(state)(data);

export const concat = (state, data) => R.concat(state, data);

export const append = (state, data) => R.append(data, state);

export const prepend = (state, data) => R.prepend(data, state);

export const removeByKey = (state, value, key = 'id') => R.pipe(
  R.groupBy(R.prop(key)),
  R.dissoc(value),
  R.values,
  R.reduce(R.concat, [])
)(state);


export const replace = (state, data = [], key = 'id', sort = 'updated_at', reverse = true) => {
  const rData = R.pipe(
    R.concat(R.__, data),
    R.groupBy(R.prop(key)),
    R.values,
    R.map(R.reduce(R.merge, {})),
    R.sortBy(R.prop(sort))
  )(state);

  return reverse ? R.reverse(rData) : rData;
};

export const clone = state => R.clone(state);

export const toArray = (data, key = 'key', value = 'value') => R.compose(R.map(R.zipObj([key, value])), R.toPairs)(data);

export const groupBy = (data, callback) => R.groupBy(callback)(data);

export const sortBy = (data, key = 'key', reverse = false) => {
  const rData = R.sortBy(R.compose(R.toLower, R.prop(key)))(data);
  return reverse ? R.reverse(rData) : rData;
};

export default R;