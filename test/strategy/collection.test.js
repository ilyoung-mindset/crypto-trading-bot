let assert = require('assert');
let strategy = require('../../strategy/collection');

describe('#strategy collection', () => {
    it('strategy cci short', async () => {
        const result = await strategy.cci(
            394,
            [500, 400],
            [500, 400],
            [80, 90, 100, 110, 130, 150, 180, 200, 220, 280, 220, 200, 180, 150, 130, 90]
        )

        assert.equal('short', result['signal'])
        assert.equal(280, result['_trigger'])

        const result2 = await strategy.cci(
            394,
            [500, 400],
            [500, 400],
            [80, 90, 100, 110, 130, 150, 180, 190, 199, 180, 150, 130, 90]
        )

        assert.equal(undefined, result2)
    });

    it('strategy cci long', async () => {
        const result = await strategy.cci(
            404,
            [500, 400],
            [500, 400],
            [-80, -90, -100, -110, -130, -150, -180, -200, -220, -280, -220, -200, -180, -150, -130, -90]
        )

        assert.equal('long', result['signal'])
        assert.equal(-280, result['_trigger'])

        const result2 = await strategy.cci(
            404,
            [500, 400],
            [500, 400],
            [-80, -90, -100, -110, -130, -150, -180, -190, -199, -180, -150, -130, -90]
        )

        assert.equal(undefined, result2)

        const result3 = await strategy.cci(
            404,
            [900, 900],
            [500, 400],
            [-80, -90, -100, -110, -130, -150, -180, -200, -220, -280, -220, -200, -180, -150, -130, -90]
        )

        assert.equal('long', result3['signal'])
        assert.equal(-280, result3['_trigger'])
    });

    it('strategy macd long', async () => {
        const result = await strategy.macd(
            404,
            [500, 400],
            [500, 400],
            [{'histogram': -1}, {'histogram': 0.1}]
        )

        assert.equal('long', result['signal'])

        assert.equal(undefined, await strategy.macd(
            360,
            [500, 400],
            [500, 400],
            [{'histogram': -1}, {'histogram': 0.1}]
        ))

        assert.equal(undefined, await strategy.macd(
            404,
            [500, 400],
            [500, 400],
            [{'histogram': -2}, {'histogram': -1}]
        ))

        assert.equal(undefined, await strategy.macd(
            404,
            [500, 400],
            [500, 400],
            [{'histogram': 2}, {'histogram': -1}]
        ))
    });

    it('strategy macd short', async () => {
        const result = await strategy.macd(
            394,
            [500, 400],
            [500, 400],
            [{'histogram': 1}, {'histogram': -0.1}]
        )

        assert.equal('short', result['signal'])

        assert.equal(undefined, await strategy.macd(
            403,
            [500, 400],
            [500, 400],
            [{'histogram': 1}, {'histogram': -0.1}]
        ))
    });
});
