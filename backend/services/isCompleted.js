// swaggerRequest.js

const Swagger = require('swagger-client');
const UserModel = require('./User'); // Varsayılan olarak UserModel'e atıfta bulunduğunuzdan emin olun

async function makeSwaggerRequest(userEmail) {
  try {
    const client = await Swagger({
      url: 'https://localhost:44323/api/identity/users/by-email/fatihberkant38gmail.com',
      requestInterceptor(req) {
        // Burada gerekirse isteği değiştirebilir veya başlık ekleyebilirsiniz
        return req;
      },
    });

    // Kullanıcının e-postasına göre API'ye istek gönderme
    const response = await client.apis.UserAPI.getUserByEmail({ email: userEmail });

    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = makeSwaggerRequest;
