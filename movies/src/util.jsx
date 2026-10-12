import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {
    length: 400,
    separator: /,?\.* +/,
  });
}