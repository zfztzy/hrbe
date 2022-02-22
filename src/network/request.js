import axios from 'axios'

// export function request(config,success,failure){
//     const instance = axios.create({
//         baseURL:'',
//         timeout:5000
//     })
//     instance(config)
//         .then(res =>{
//             console.log(res);
//             success(res)
//         })
//         .catch(res =>{
//             console.log(res);
//             failure(res)
//         })
// }


// export function request2(config){
//     const instance = axios.create({
//         baseURL:'',
//         timeout:5000
//     })
//     instance(config.baseConfig)
//         .then(res =>{
//             console.log(res);
//             config.success(res)
//         })
//         .catch(res =>{
//             console.log(res);
//             config.failure(res)
//         })
// }


// export function requests1(config){
//     return new Promise((resolve, reject) => {
//         const instance = axios.create({
//             baseURL:'',
//             timeout:5000
//         })
//         instance(config)
//             .then(res =>{
//                 resolve(res)
//             })
//             .catch(res =>{
//                 reject(err)
//             })
//     })
// }



export function request(config){
    const instance = axios.create({
        baseURL:'',
        timeout:5000,
    })
    return instance(config)
}