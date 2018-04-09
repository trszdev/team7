let db = {};

export const clearDb = () => {
    db = {};
};

class Response extends Error {
    constructor(statusCode) {
        super(`Fake response ${statusCode}`);
        this.statusCode = statusCode;
    }
}

const simulateRequest = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            reject(new Response(418));
            return;
        }
        resolve();
    }, 1);
});

export const put = async (key, value) => {
    await simulateRequest();
    db[key] = [value];
};

export const post = async (key, value) => {
    await simulateRequest();
    if (!db[key]) {
        db[key] = [];
    }
    db[key].push(value);
};

/*
    from           - моложе указанного таймстемпа (new Date().getTime())
    to             - старше указанного таймстемпа (new Date().getTime())
    sortByAlphabet – нужно ли сортировать по алфавиту
    limit          – в указанном количестве (по умолчанию, Infinity)
    offset         – с отступ от начала выборки (по умолчанию, 0)
*/
export const getAll = async (key, options = {}) => {
    await simulateRequest();
    const query = Object.assign({}, options);
    Object.keys(options).forEach((x) => {
        if (query[x] === undefined) {
            delete query[x];
        }
    });
    if (query.sortByAlphabet) {
        query.sort = 'alph';
    }
    delete query.sortByAlphabet;
    if (!db[key]) {
        return [];
    }
    return db[key];
};

export const get = async (key) => {
    await simulateRequest();
    if (!db[key]) {
        throw new Response(404);
    }

    const values = db[key];
    return values[values.length - 1];
};

export const remove = async (key) => {
    await simulateRequest();
    delete db[key];
};
