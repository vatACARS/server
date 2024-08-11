const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

module.exports = function (options) {
    return {
        ...options,
        devtool: 'source-map',
        plugins: [
            ...options.plugins,
            new sentryWebpackPlugin({
                authToken: process.env.sentry_auth_token,
                org: 'vatacars',
                project: 'vatacars-server',
            })
        ]
    };
};