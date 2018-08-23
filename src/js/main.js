(function() {
    var filterTypeElem = document.querySelector("#filter-type");
    var sortByElem = document.querySelector("#sort-by");
    var sortOrderElem = document.querySelector("#sort-order");
    var filterElem =  document.querySelector("#filter");
    var consoleList = document.querySelector("#console-list");

    function doSort() {
        var order = sortOrderElem.value === "asc" ? 1 : -1;

        var sortFunc;
        var sortBy = sortByElem.value;
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

    (function() {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("type")) {
            filterTypeElem.value = urlParams.get("type");
        }
        if (urlParams.has("sort")) {
            sortByElem.value = urlParams.get("sort");
        }
        if (urlParams.has("order")) {
            sortOrderElem.value = urlParams.get("order");
        }
        if (urlParams.has("filter")) {
            filterElem.value = urlParams.get("filter");
        }
    })();

    function updateLocation() {
        var p = new URLSearchParams();

        if (filterTypeElem.value != "all" || sortByElem.value != "year" || 
            sortOrderElem.value != "asc" || filterElem.value != "") {
            p.append("type", document.querySelector("#filter-type").value);
            p.append("sort", document.querySelector("#sort-by").value);
            p.append("order", document.querySelector("#sort-order").value);
            p.append("filter", document.querySelector("#filter").value);
            window.history.replaceState({}, "", window.location.pathname + "?" + p.toString());
        } else {
            window.history.replaceState({}, "", window.location.pathname);
        }
    }

    (function() {
        filterTypeElem.addEventListener("change", function(event) { updateLocation(); doSort(); });
        sortByElem.addEventListener("change", function(event) { updateLocation(); doSort(); });
        sortOrderElem.addEventListener("change", function(event) { updateLocation(); doSort(); });

        var timeout = null;
        filterElem.addEventListener("input", function(event) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout(function() { timeout = null; updateLocation(); doSort(); }, 250);
        });
    })();

    doSort();
})();
