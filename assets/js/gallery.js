$(async function show() {
    //get gallery
    async function getGallery(votreUrl) {

        return await $.ajax({
            url: votreUrl,
            success: function (response, status, xhr) {
                if (status == "success" && response) {
                    let gallery = response
                }
            },
            error: function (error) {
                console.log(error.statusText);
            }
        })
    }

    //show gallery
    const urlApi = "/api/gallery.json"
    let gallery = await getGallery(urlApi);

    $(".gallery-box-miniature").html("")
    gallery.forEach((item) => {
        $(".gallery-box-miniature").append(`
    <div class="image-box relative">
        <div class="image"><img src="${item.imageUrl}" alt="${item.name}" id="${item._id}"></div>
        <div class="title">${item.name}</div>
    </div>
    `)
    });


    //show a selected picture on big screen
    $(".image-box").click(function (e) {
        let idItemActu = $(this).children().children('img').attr("id")
        $(".layout").removeClass("none")
        $(".gallery-box-naviguation").removeClass("none")
        gallery.forEach((item) => {
            if (item._id == idItemActu) {
                $(".gallery-box-naviguation .image-naviguate").html("")
                $(".gallery-box-naviguation .image-naviguate").append(`
                <div class="image"><img src="${item.imageUrl}" alt="${item.name}" id="${item._id}" style="width:300px;height:300px;"></div>
                `)
            }
        })
    })

    //close big screen
    $(".image-box-naviguate i").click(function (e) {
        $(".layout").addClass("none")
        $(".gallery-box-naviguation").addClass("none")
    })

    //set width and height
    let setWandH = {
        setWidth: 300,
        setHeight: 300,
        setDeg: 0
    }

    //get prev image
    $(".prev-bt").click(function (e) {

        setWandH = {
            ...setWandH, setWidth: 300, setHeight: 300, setDeg: 0
        }

        let idItemActu = $(this).closest(".naviguate-bt").prev(".image-box-naviguate").children(".image-naviguate").children(".image").children('img').attr("id")
        idItemActu = parseInt(idItemActu)
        if (idItemActu != 1) {
            gallery.forEach((item) => {
                let idItemPrev = idItemActu - 1
                if (item._id == idItemPrev) {
                    $(".gallery-box-naviguation .image-naviguate").html("")
                    $(".gallery-box-naviguation .image-naviguate").append(`
                    <div class="image"><img src="${item.imageUrl}" alt="${item.name}" id="${item._id}" style="width:${setWandH.setWidth}px;height:${setWandH.setHeight}px;transform:rotate(${setWandH.setDeg}deg);"></div>
                    `)
                }
            })
        }

    })

    //get next image
    $(".next-bt").click(function (e) {

        setWandH = {
            ...setWandH, setWidth: 300, setHeight: 300, setDeg: 0
        }

        let idItemActu = $(this).closest(".naviguate-bt").prev(".image-box-naviguate").children(".image-naviguate").children(".image").children('img').attr("id")
        idItemActu = parseInt(idItemActu)
        if (idItemActu != gallery.length) {
            gallery.forEach((item) => {
                let idItemNext = idItemActu + 1
                if (item._id == idItemNext) {
                    $(".gallery-box-naviguation .image-naviguate").html("")
                    $(".gallery-box-naviguation .image-naviguate").append(`
                    <div class="image"><img src="${item.imageUrl}" alt="${item.name}" id="${item._id}" style="width:${setWandH.setWidth}px;height:${setWandH.setHeight}px;transform:rotate(${setWandH.setDeg}deg)"></div>
                    `)
                }
            })
        }

    })

    //rotate image to left
    let i = 0
    $(".rotate-left").click(function (e) {
        i -= 90
        setWandH = {
            ...setWandH, setDeg: i
        }

        let idItemActu = $(this).closest(".naviguate-bt").prev(".image-box-naviguate").children(".image-naviguate").children(".image").children('img').attr("id")
        idItemActu = parseInt(idItemActu)
        gallery.forEach((item) => {
            if (item._id == idItemActu) {
                $(".gallery-box-naviguation .image-naviguate").html("")
                $(".gallery-box-naviguation .image-naviguate").append(`
                    <div class="image"><img src="${item.imageUrl}" alt="${item.name}" id="${item._id}" style="width:${setWandH.setWidth}px;height:${setWandH.setHeight}px;transform:rotate(${setWandH.setDeg}deg);"></div>
                    `)
            }
        })
    })

    //rotate image to right
    $(".rotate-right").click(function (e) {
        i += 90
        setWandH = {
            ...setWandH, setDeg: i
        }
        let idItemActu = $(this).closest(".naviguate-bt").prev(".image-box-naviguate").children(".image-naviguate").children(".image").children('img').attr("id")
        idItemActu = parseInt(idItemActu)
        gallery.forEach((item) => {
            if (item._id == idItemActu) {
                $(".gallery-box-naviguation .image-naviguate").html("")
                $(".gallery-box-naviguation .image-naviguate").append(`
                    <div class="image"><img src="${item.imageUrl}" alt="${item.name}" id="${item._id}" style="width:${setWandH.setWidth}px;height:${setWandH.setHeight}px;transform:rotate(${setWandH.setDeg}deg);"></div>
                    `)
            }
        })
    })


    //zoom plus
    let y = 0
    $(".zoom-plus").click(function (e) {
        y = $(this).closest(".naviguate-bt").prev(".image-box-naviguate").children(".image-naviguate").children(".image").children('img').css("width")
        y = parseInt(y)
        y += 20
        //limite superieur
        if (y > 580) {
            y = 580
        }
        setWandH = {
            ...setWandH, setWidth: y, setHeight: y
        }

        let idItemActu = $(this).closest(".naviguate-bt").prev(".image-box-naviguate").children(".image-naviguate").children(".image").children('img').attr("id")
        idItemActu = parseInt(idItemActu)
        gallery.forEach((item) => {
            if (item._id == idItemActu) {
                $(".gallery-box-naviguation .image-naviguate").html("")
                $(".gallery-box-naviguation .image-naviguate").append(`
                    <div class="image"><img src="${item.imageUrl}" alt="${item.name}" id="${item._id}" style="width:${setWandH.setWidth}px;height:${setWandH.setWidth}px;transform:rotate(${setWandH.setDeg}deg)"></div>
                    `)
            }
        })
    })

    //zoom plus
    let z = 0
    $(".zoom-minus").click(function (e) {
        z = $(this).closest(".naviguate-bt").prev(".image-box-naviguate").children(".image-naviguate").children(".image").children('img').css("width")
        z = parseInt(z)
        z -= 20
        //limite inferieur
        if (z < 5) {
            z = 10
        }

        setWandH = {
            ...setWandH, setWidth: z, setHeight: z
        }

        let idItemActu = $(this).closest(".naviguate-bt").prev(".image-box-naviguate").children(".image-naviguate").children(".image").children('img').attr("id")
        idItemActu = parseInt(idItemActu)
        gallery.forEach((item) => {
            if (item._id == idItemActu) {
                $(".gallery-box-naviguation .image-naviguate").html("")
                $(".gallery-box-naviguation .image-naviguate").append(`
                    <div class="image"><img src="${item.imageUrl}" alt="${item.name}" id="${item._id}" style="width:${setWandH.setWidth}px;height:${setWandH.setWidth}px;transform:rotate(${setWandH.setDeg}deg)"></div>
                    `)
            }
        })
    })

})