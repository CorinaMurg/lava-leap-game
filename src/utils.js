
function parseQuery(queryString) {
    let query = {};
    let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
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

export { parseQuery, arrowKeys };
