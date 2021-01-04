module.exports.addSentMessage = function({ id, query, time }) {
  const message = {
    userId: id,
    message: {
      sent: query,
      id: '_' + Math.random().toString(36).substr(2, 9),
      time,
      read: 'unread',
    }};
    return message;
};

module.exports.addReceivedMessage = function(userId, time) {
  const message = { 
    userId,
    message: {
      received: 'hi',
      id: '_' + Math.random().toString(36).substr(2, 9),
      time,
      read: 'unread',
    }
  }

  return message;
};
