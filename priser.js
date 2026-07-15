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

        setPrice("interiør_person", data.interiør_person);
        setPrice("eksteriør_person", data.eksteriør_person);
        setPrice("komplet_person", data.komplet_person);

        setPrice("interiør_stor", data.interiør_stor);
        setPrice("eksteriør_stor", data.eksteriør_stor);
        setPrice("komplet_stor", data.komplet_stor);

        setPrice("interiør_van", data.interiør_van);
        setPrice("eksteriør_van", data.eksteriør_van);
        setPrice("komplet_van", data.komplet_van);

        setPrice("interiørplus_lille", data.interiørplus_lille);
        setPrice("eksteriørplus_lille", data.eksteriørplus_lille);
        setPrice("kompletplus_lille", data.kompletplus_lille);

        setPrice("interiørplus_person", data.interiørplus_person);
        setPrice("eksteriørplus_person", data.eksteriørplus_person);
        setPrice("kompletplus_person", data.kompletplus_person);

        setPrice("interiørplus_stor", data.interiørplus_stor);
        setPrice("eksteriørplus_stor", data.eksteriørplus_stor);
        setPrice("kompletplus_stor", data.kompletplus_stor);

        setPrice("interiørplus_van", data.interiørplus_van);
        setPrice("eksteriørplus_van", data.eksteriørplus_van);
        setPrice("kompletplus_van", data.kompletplus_van);


        setPrice("ekstra", data.ekstra);
        setPrice("rensstofsæder", data.rensstofsæder);
        setPrice("renslædersæder", data.renslædersæder);
        setPrice("coatingforrude", data.coatingforrude);
        setPrice("tekstilimprægnering", data.tekstilimprægnering);

    });