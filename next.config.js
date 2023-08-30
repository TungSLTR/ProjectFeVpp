/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  modularizeImports: {
    'react-bootstrap': {
      transform: 'react-bootstrap/{{member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}'
    },
    '@mui/material': {
			transform: '@mui/material/{{member}}'
		},
		'@mui/lab': {
			transform: '@mui/lab/{{member}}'
		},
		'@mui/icons-material/?(((\\w*)?/?)*)': {
			transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
		}
  },
};
module.exports = nextConfig
