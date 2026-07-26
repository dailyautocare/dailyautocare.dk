fetch("priser.json")
    .then(response => response.json())
    .then(data => {

        function setPrice(className, value) {
            document.querySelectorAll("." + className).forEach(el => {
                el.textContent = value;
            });
        }

        setPrice("interiør_lille", data.interiør_lille);
        setPrice("eksteriør_lille", data.eksteriør_lille);
        setPrice("komplet_lille", data.komplet_lille);

        setPrice("interiørplus_lille", data.interiørplus_lille);
        setPrice("eksteriørplus_lille", data.eksteriørplus_lille);
        setPrice("kompletplus_lille", data.kompletplus_lille);

        setPrice("ekstra", data.ekstra);
        setPrice("rensstofsæder", data.rensstofsæder);
        setPrice("renslædersæder", data.renslædersæder);
        setPrice("coatingforrude", data.coatingforrude);
        setPrice("tekstilimprægnering", data.tekstilimprægnering);
        setPrice("rensafhimmel", data.rensafhimmel);

    });