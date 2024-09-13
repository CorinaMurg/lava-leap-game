function parseURLQuery(query) {
    let result = {};
    let keyValuePairs = (query[0] === '?' ? query.slice(1) : query).split('&');
    for (let i = 0; i < keyValuePairs.length; i++) {
        let pair = keyValuePairs[i].split('=');
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return result;
}

export { parseURLQuery };