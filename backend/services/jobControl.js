// // axios kütüphanesini içe aktarın
// const axios = require('axios');

// // Fonksiyonu tanımlayın
// function checkUser(apiEndpoint, mail, onSuccess, onError) {
//     // API'ye GET isteği gönderin
//     axios.get(`${apiEndpoint}/${mail}`)
//         .then(response => {
//             // Yanıt başarılıysa
//             onSuccess(response.data); // Veriyi döndürün
//         })
//         .catch(error => {
//             // Hata durumunda
//             onError(error.message);
//         });
// }
