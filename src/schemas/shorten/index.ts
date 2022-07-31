const ShortenSchema = {
  id: "/Shorten",
  type: "object",
  properties: {
    url: { type: "string" },
  },
  required: ["url"],
};

export default ShortenSchema;
