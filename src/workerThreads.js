self.onmessage = function (message) {
  // do the work

  self.postMessage(message.data);
};
