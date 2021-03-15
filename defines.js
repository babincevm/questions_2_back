module.exports = (function () {
    if (!Array.prototype.shuffle) {
        Object.defineProperty(Array.prototype, 'shuffle', {
            value: function () {
                for (let i = this.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [this[i], this[j]] = [this[j], this[i]];
                }
                return this;
            }
        });
    }

    // if (!Object.prototype.shuffle) {
    //     Object.defineProperty(Object.prototype, 'shuffle', {
    //         value: function () {
    //             return Object.keys(this)
    //                 .map(key => ({key, value: this[key]}))
    //                 .sort((a, b) => Math.random() - 0.5)
    //                 .reduce((acc, e) => {
    //                     acc[e.key] = e.value;
    //                     return acc;
    //                 }, {});
    //         }
    //     });
    // }
})();
