export interface Music {
  "im:name": {
    label: string;
  };
  "im:image": {
    label: string;
  }[];
  "im:price": {
    label: string;
  };
  link: {
    attributes: {
      href: string;
    };
  };
  id: {
    attributes: {
      "im:id": string;
    };
  };
  "im:artist": {
    label: string;
    attributes: {
      href: string;
    };
  };
  category: {
    attributes: {
      term: string;
    };
  };
  "im:releaseDate": {
    label: string;
  };
}
