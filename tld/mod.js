import { getPublicSuffix } from "tldts";

export default (domain) => {
  const suffix = getPublicSuffix(domain);
  const p = domain.lastIndexOf(".", domain.length - suffix.length - 2);
  if (p < 0) return domain;
  return domain.slice(p + 1);
};
