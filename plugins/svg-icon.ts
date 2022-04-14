const req = require.context("~/assets/icons/svgs", false, /\.svg$/);
const requireAll = (requireContext: any): void =>
  requireContext.keys().map(requireContext);

requireAll(req);
