import ReactGA from 'react-ga';

export const initGA = (trackingID) => {
  ReactGA.initialize(trackingID);
};

export const PageView = (path) => {
  ReactGA.set({ page: path });
  ReactGA.pageview(path);
};

/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const Event = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
