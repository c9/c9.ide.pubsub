module.exports = function (vfs, options, register) {
    var Stream = require('stream');
    var stream;

    register(null, {
        subscribe: function (callback) {
            if (stream) return callback(null, { stream: stream });

            stream = new Stream();
            stream.readable = true;
            callback(null, { stream: stream });
        },

        publish: function(message) {
            if (!stream)
                console.error("PubSub stream not ready");
            stream.emit("data", message);
        }
    });
};
