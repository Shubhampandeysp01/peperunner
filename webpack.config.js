module.exports = function (webpackEnv) {
    // ...
    print("Webkmksnkcnskdnkndskkdnkndknkdsk");
    return {
     // ...
      resolve: {
        // ...
        fallback: {
          // 👇️👇️👇️ add this 👇️👇️👇️
          path: require.resolve("path-browserify"),
          stream: require.resolve("stream-browserify"),
          https: require.resolve("https-browserify"),
          http: require.resolve("stream-http")
        }
      }
    }
  }
  