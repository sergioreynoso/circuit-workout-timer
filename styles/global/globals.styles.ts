import { globalCss } from '../stitches.congif';

export const globalStyles = globalCss({
  '*,*::before,*::after': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  'html,body': {
    height: '100%',
  },
  body: {
    fontFamily: '$body',
    lineHeight: '$100',
    '-webkit-font-smoothing': 'antialiased',
    color: '$text-contrast-high',
    backgroundColor: '$primary-01',
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },
  'input, button, textarea, select': {
    font: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },
  '#__next': {
    isolation: 'isolate',
    height: '100%',
  },
});
