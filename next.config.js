/** @type {import('next').NextConfig} */

const withLess = require("next-with-less");

module.exports = withLess({
    reactStrictMode: true,
    swcMinify: true,
    lessLoaderOptions: {
        lessOptions: {
            modifyVars: {
                "primary-color": "#9900FF",
                "border-radius-base": "2px",
            },
        },
    },
});

