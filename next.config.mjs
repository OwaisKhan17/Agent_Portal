import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  //   webpackDevMiddleware: (config) => {
  //     config.watchOptions = {
  //       poll: 1000,
  //       aggregateTimeout: 300,
  //     };
  //     return config;
  //   },
//   webpackDevMiddleware: (config) => {
//     config.watchOptions = {
//       poll: 600,
//       aggregateTimeout: 300,
//     };
//     return config;
//   },

webpack: (config, _) => ({
    ...config,
    watchOptions: {
      ...config.watchOptions,
      poll: 300,
      aggregateTimeout: 100,
    },
  }),
};
export default withNextIntl(nextConfig);
