/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        PrimaryColor: {
          50: '#FFF7F4',
          100: '#FFEFE8',
          200: '#FFD1BB',
          300: '#FFB593',
          400: '#FF793A',
          500: '#FF5100',
          600: '#DC4600',
          700: '#AB3600',
          800: '#7D2800',
          900: '#5C1D00',
        },
        PrimaryGreyColor: {
          50: '#FBFBFB',
          100: '#F4F4F4',
          200: '#E7E7E7',
          300: '#CFCFCF',
          400: '#AEAEAE',
          500: '#808080',
          600: '#737373',
          700: '#505050',
          800: '#323232',
          900: '#1D1D1D',
        },
        Text: {
          Hold: '#cfcfcf',
          Wh: '#FFFFFF',
          400: '#AEAEAE',
          600: '#737373',
          900: '#1D1D1D',
        },
        BorderLine: {
          200: '#E7E7E7',
          300: '#CFCFCF',
        },
        Dim: {
          800: '#32323280',
        },
        System: {
          Error: '#DF291D',
          Positive: '#1FB881',
        },
        Basic: {
          Black: '#141212',
          White: '#FFFFFF',
        },
        Primary: {
          400: '#FF793A',
          500: '#FF5100',
          800: '#7D2800',
        },
        Fill: {
          Wh: '#FFFFFF',
          50: '#FBFBFB',
          100: '#F4F4F4',
          200: '#E7E7E7',
        },
      },
    },
  },
  plugins: [],
};
