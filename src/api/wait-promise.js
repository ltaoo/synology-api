function noop() {}
/**
 * @param {number} interval - 定时器间隔
 * @param {number} beforeTime - 隔多少时间后开始轮询
 * @param {number} afterTime
 * @param {number} limit - 轮询次数？限制，超出则轮询视为失败
 */
function Wait(interval, beforeTime, afterTime = 0, limit) {
    this.every(interval, limit);
    this.before(beforeTime);
    this.after(afterTime);
}

Wait.prototype = {
    /**
     * 设定过期时间
     * @param {number} time
     */
    before(time) {
        this.startTime = Date.now();
        this.expires = this.startTime + time;
        return this;
    },
    and(func) {
        this.routine = func;
        return this;
    },
    /**
     * 设定 afterTime
     * @param {number} time
     */
    after(time) {
        this.afterTime = time;
        return this;
    },
    /**
     * 设定定时器间隔
     * @param {number} interval - 定时器间隔
     * @param {number} limit
     */
    every(interval, limit) {
        this.interval = interval;
        if (limit !== null) {
            this.limit(limit);
        }
        return this;
    },
    /**
     * 设定 limit
     * @param {number} limit
     */
    limit(limit) {
        const nextLimit = limit > 0 ? limit : Infinity;
        this.limit = nextLimit;
        return this;
    },
    check(cond = noop) {
        return this.before(0).until(cond);
    },
    forward() {
        return this.until(() => false);
    },
    till(cond) {
        const self = this;
        return this.until(() => {
            let res;
            try {
                res = cond();
                return res === true;
            } catch (ex) {
                // force error
                self.limit = 0;
                throw ex;
            }
        });
    },
    /**
     * 要用来判断的代码，即轮询部分，返回 promise
     * @param {function} cond
     */
    until(cond) {
        const { routine } = this;
        const self = this;
        let called = 0;

        return new Promise(((resolve, reject) => {
            function f() {
                if (routine) {
                    routine(called);
                }
                called += 1;

                cond()
                    .then((...args) => {
                        /* eslint-disable prefer-spread */
                        resolve.apply(null, args);
                    })
                    .catch(() => f())
                    .finally(() => {
                        if (Date.now() >= self.expires || called >= self.limit) {
                            reject(new Error('超出次数或时间限制'));
                        }
                    });
            }
            f();

            // setTimeout(() => {
            //     // 每隔一定时间调用一次 f
            //     timer = setInterval(f, interval);
            // }, afterTime);
        }));
    },
};

module.exports = {
    every(interval, limit) {
        return new Wait(interval, Infinity, 0, limit);
    },
    and(func) {
        return new Wait(100, Infinity, 0).and(func);
    },
    limit(limit) {
        return new Wait(100, Infinity, 0, limit);
    },
    before(time, limit) {
        return new Wait(100, time, 0, limit);
    },
    after(time) {
        return new Wait(100, Infinity, time);
    },
    sleep(time) {
        return new Wait(100, Infinity, time).check();
    },
    until(cond) {
        return (new Wait(100, Infinity)).until(cond);
    },
    forward() {
        return (new Wait(100, Infinity)).forward();
    },
    till(cond) {
        return (new Wait(100, Infinity)).till(cond);
    },
    check(cond) {
        return (new Wait(100, 0)).until(cond);
    },
};
