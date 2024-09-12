
function parseURLQuery(query) {
    let result = {};
    let keyValuePairs = (query[0] === '?' ? query.slice(1) : query).split('&');
    for (let i = 0; i < keyValuePairs.length; i++) {
        let pair = keyValuePairs[i].split('=');
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return result;
}

function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type == "keydown";

            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
  }
  
const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "w", "a", "s", "d"]);

export { parseURLQuery, arrowKeys };
