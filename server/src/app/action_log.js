module.exports = (function() {
  let log = [];

  return {
    logStep: function(description, json) {
      log.push({ message: description, data: json });
    },
    clearLog: function() {
      log = [];
    },
    getLog: function() {
      return log;
    }
  };
})();
