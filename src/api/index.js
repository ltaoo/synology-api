const Wait = require('./wait-promise');

let i = 0;
const p = function p() {
    console.log('called', i += 1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            console.log('这次请求的结果是 ', random);
            if (random > 0.8) {
                resolve(random);
                return;
            }
            reject(new Error(`err ${random}`));
        }, 2000);
    });
};

const res = Wait.until(p);
res
    .then((data) => {
        console.log('result is bigger then 0.8', data);
    })
    .catch((err) => {
        console.error(err);
    });
