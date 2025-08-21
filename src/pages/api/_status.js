export default function handler(req, res) {
  // Define the JSON data
  const data = {
    message: 'Feelin good!', // User message
    csrf: '11ff0e613e5c782d5cf29c5b565be2258880.0002025-03-26T22:32:39+00:00', // CSRF token
  };

  res.status(200).json(data);
};
