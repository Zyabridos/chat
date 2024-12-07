export const updateMessagesArray = (state, e) => {
  const [input] = e.target.children;
  if (input.value.length > 0) {
    state.messages.push({id: _.uniqueId, message: input.value});
    return state;
  };
};
