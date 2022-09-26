import { Chance } from "chance";

const chance = Chance();

function __createYoutubeLink() {
  const path = chance.string({ length: 11, alpha: true, numeric: true });

  const youtubeLink = chance.url({
    protocol: "https",
    domain: "www.youtube.com",
    path: `watch?v=${path}`,
  });

  return youtubeLink;
}

export function __input() {
  return {
    name: chance.name(),
    youtubeLink: __createYoutubeLink(),
  };
}
