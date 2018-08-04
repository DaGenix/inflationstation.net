var doSort = function() {
    var order = document.querySelector("#sort-order").value === "asc" ? 1 : -1;

    var sortFunc;
    var sortBy = document.querySelector("#sort-by").value;
    if (sortBy === "year") {
        sortFunc = function(a, b) { return a.getAttribute("data-year") - b.getAttribute("data-year"); }
    } else if (sortBy === "manufacturer") {
        sortFunc = function(a, b) {
            var val = a.getAttribute("data-manufacturer").localeCompare(b.getAttribute("data-manufacturer"));
            if (val === 0) {
                return a.getAttribute("data-year") - b.getAttribute("data-year");
            } else {
                return val;
            }
        }
    } else if (sortBy === "orig-price") {
        sortFunc = function(a, b) { return a.getAttribute("data-orig-price") - b.getAttribute("data-orig-price"); }
    } else if (sortBy === "price") {
        sortFunc = function(a, b) { return a.getAttribute("data-price") - b.getAttribute("data-price"); }
    }

    var consoleList = document.querySelector("#console-list");
    var nodes = Array.from(consoleList.children);
    nodes.sort(function(a, b) {
        var val = sortFunc(a, b);
        if (val === 0) {
            return order * a.getAttribute("data-name").localeCompare(b.getAttribute("data-name"));
        } else {
            return order * val;
        }
    });

    var filter_type = document.getElementById("filter-type").value;
    nodes.forEach(function (e) {
        if (filter_type === "all") {
            e.classList.remove("d-none");
        } else if (filter_type === "home") {
            if (e.getAttribute("data-type") === "home" || e.getAttribute("data-type") === "hybrid") {
                e.classList.remove("d-none");
            } else {
                e.classList.add("d-none");
            }
        } else if (filter_type === "handheld") {
            if (e.getAttribute("data-type") === "handheld" || e.getAttribute("data-type") === "hybrid") {
                e.classList.remove("d-none");
            } else {
                e.classList.add("d-none");
            }
        }
    });

    var filter = document.getElementById("filter").value.toLocaleLowerCase();
    nodes.forEach(function (e) {
        if (filter !== "") {
            if (!e.getAttribute("data-name").toLocaleLowerCase().includes(filter) &&
                !e.getAttribute("data-manufacturer").toLocaleLowerCase().includes(filter)) {
                e.classList.add("d-none");
            }
        }
    })

    nodes.forEach(function(e) { consoleList.appendChild(e); })
};

document.querySelector("#filter-type").addEventListener("change", function(event) { doSort(); });
document.querySelector("#sort-by").addEventListener("change", function(event) { doSort(); });
document.querySelector("#sort-order").addEventListener("change", function(event) { doSort(); });

var timeout = null;
document.querySelector("#filter").addEventListener("input", function(event) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    timeout = setTimeout(function() { timeout = null; doSort(); }, 250);
});

doSort();
