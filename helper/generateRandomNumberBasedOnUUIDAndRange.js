import seedrandom from 'seedrandom';

function generateRandomNumberBasedOnUUIDAndRange(uuid, start, end) {
    if (start >= end) {
        throw new Error('Start value must be less than end value');
    }

    const rng = seedrandom(uuid);

    const randomNumber = Math.floor(rng() * (end - start + 1)) + start;
    return randomNumber;
}

export default generateRandomNumberBasedOnUUIDAndRange;
