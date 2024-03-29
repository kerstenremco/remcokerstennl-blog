async function handler(event) {
  const request = event.request;
  const headers = request.headers;
  const uri = request.uri;
  const oldCats = [
    "networking",
    "ai",
    "nat",
    "coding",
    "azure",
    "cybersecurity",
    "frontend",
  ];
  const oldCat = oldCats.filter((c) => uri.includes(`/${c}/`))[0];
  if (oldCat) {
    let newurl = uri.replace(`/${oldCat}/`, "/posts/");
    const response = {
      statusCode: 301,
      statusDescription: "Found",
      headers: { location: { value: newurl } },
    };
    return response;
  }
  return request;
}
