const env = process.env.NODE_ENV;
export default function(opts = {}) {
  const plugins = [
    require.resolve("@babel/plugin-transform-modules-commonjs"),
    require.resolve("babel-plugin-syntax-export-extensions"),
    // adds React import declaration if file contains JSX tags
    require.resolve("babel-plugin-react-require"),
    require.resolve("@babel/plugin-syntax-dynamic-import"),
    /*
        let { x, y, ...z } = { x:1, y:2, a:3, b:4 };
        x; // 1y; // 2z; // { a: 3, b: 4 }
    */
    require.resolve("@babel/plugin-proposal-object-rest-spread"),

    // require.resolve("@babel/plugin-proposal-optional-catch-binding"),

    /*
        async function* agf() {
            await 1;
            yield 2;
        }
    */
    require.resolve("@babel/plugin-proposal-async-generator-functions"),

    //装饰器 @annotation
    [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
    //类
    [
      require.resolve("@babel/plugin-proposal-class-properties"),
      { loose: true }
    ],
    /**
     * export * as ns from 'mod';
     * export v from 'mod';
     */
    // require.resolve("@babel/plugin-proposal-export-namespace"),
    // require.resolve("@babel/plugin-proposal-export-default"),
    require.resolve("@babel/plugin-proposal-export-namespace-from"),
    require.resolve("@babel/plugin-proposal-export-default-from"),

    // var foo = object.foo ?? "default";
    require.resolve("@babel/plugin-proposal-nullish-coalescing-operator"),
    // const safe = obj?.qux?.baz; // undefined
    require.resolve("@babel/plugin-proposal-optional-chaining"),
    // require.resolve("@babel/plugin-proposal-pipeline-operator"),
    // require.resolve("@babel/plugin-proposal-do-expressions"),
    // :: bind
    require.resolve("@babel/plugin-proposal-function-bind")
  ];

  // if (env === "production") {
  plugins.push(
    require.resolve("@babel/plugin-transform-react-constant-elements")
  );
  // }

  // transform-react-inline-element don't support preact
  if (!opts.preact && env === "production") {
    plugins.push(
      require.resolve("@babel/plugin-transform-react-inline-elements")
    );
  }
  if (env !== "test" && !opts.disableTransform) {
    plugins.push(require.resolve("@babel/plugin-transform-runtime"));
  }

  if (env === "production") {
    plugins.push.apply(plugins, [
      require.resolve("babel-plugin-transform-react-remove-prop-types")
    ]);
  }
  const browsers = opts.browsers || ["last 2 versions", "IE 10"];
  return {
    presets: [
      [
        require.resolve("@babel/preset-env"),
        {
          targets: opts.targets || { browsers },
          debug: opts.debug,
          modules: false,
          exclude: [
            "transform-typeof-symbol",
            "transform-unicode-regex",
            "transform-sticky-regex",
            "transform-object-super",
            "transform-new-target",
            "transform-modules-umd",
            "transform-modules-systemjs",
            "transform-modules-amd",
            "transform-literals",
            "transform-duplicate-keys"
          ]
        }
      ],
      require.resolve("@babel/preset-react"),
      // require.resolve('babel-plugin-add-module-exports'),
      // require.resolve('@babel/plugin-transform-modules-commonjs'),
    ],
    plugins
  };
}
