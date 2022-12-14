$(document).ready(function(){
    $(".hide").click(function(){
        $("p").hide();
    });
});

$(document).ready(function (){
    $(".ester").mouseenter(function (){
        alert("Hello Ester");
    });
});
//
// $(document).ready(function (){
//     $("button").click(function (){
//         $.get("http://192.168.100.6:8080/blogs/get " , function (data, status){
//            alert("Data" + data + "/nStatus" + status);
//         });
//     });
// });

$.ajax ({
    type: 'GET',
    url: 'http://192.168.100.6:8080/blogs/get',
    headers: {
        "Content-Type":"application/json",
        "accept": "application/json",
        'Access-Control-Allow-Origin': '*',
    },

    success: function (blogs){
        console.log(blogs);
        let jsonData = blogs;
        let divCard = document.getElementById('card-727');
        let row = document.createElement('div');
        row.setAttribute('class','row');

        for (let x = 0; x < jsonData.length; x++) {
            let card = createCard(jsonData[x]);
            let img = createImage(jsonData[x]);
            let title = createTitle(jsonData[x]);
            let content = createContent(jsonData[x]);
            let date = createDate(jsonData[x]);
            let deleteAndEditDiv = createDeleteAndEditButton(jsonData[x]);

            card.append(img);
            card.append(deleteAndEditDiv);
            card.append(title);
            card.append(content);
            card.append(date);

            row.append(card);

            divCard.append(row);
        }
    },
    error: function (err) {
        console.log("AJAX error in request: " + JSON.stringify(err, null, 2));

        alert('Cannot connect the computer to the server. Either complete the installation process,or restart the computer and try to connect it again :)');
    }
});



function createImage(blog){

    let img = document.createElement('img');
    img.setAttribute('style', '    ' +
        '    width: 303px;\n' +
        '    height: 165px;\n' +
        '    margin-left: -15px;\n' +
        '    border-radius: 15px;\n');
    img.setAttribute('class', 'images');
    if(blog.images.length > 0){

        img.src = 'http://192.168.100.6:8080/get/image/' + blog.images[0].id;
    };


    return img;
}

function createCard(blog) {
    let card = document.createElement('div');
    card.setAttribute('id', blog.id);
    card.setAttribute('class', 'col-sm-3 card');
    card.setAttribute('style', 'border:solid; height:300px;word-break: break-all; margin:1%;border-radius: 15px;' +
        '              left: 100px;');

    return card;
}

function createTitle(blog){
    let title = document.createElement('p');
    title.innerText = blog.title;

    title.setAttribute('style','font-weight: 600;font-size: 20px;');

    return title;
}

function createContent(blog){
    let content = document.createElement('p');
    content.setAttribute('style','margin-top:-20px;');

    textContent = blog.content.substring(0,70).replace( /(<([^>]+)>)/ig, '');
    if(blog.content.length > 70){
        textContent = textContent + '...';
    }

    content.innerText = textContent

    return content;
}

function createDate(blog){
    let date = document.createElement('p');
    date.setAttribute('style','    ' +
        '    margin-left: 170px;\n' +
        '    margin-top: -12px;')
    date.innerText = blog.date;

    return date;
}

function deleteBlog (blog){
    console.log(blog);
    $.ajax({
        url: 'http://192.168.100.6:8080/blogs/delete/' + blog.id,
        type: 'DELETE',
        contentType:'application/json',
        headers: {
            "Content-Type":"application/json",
            "Accept": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials' : 'true',
        },

        success: function(blog) {
            if (blog.status != 200) {
                console.log('ERROR');
            } else {
                console.log('DELETED!');
            }}
    });
    window.location.reload();
}

function createDeleteAndEditButton(blog){

    let deleteOrEditDiv = document.createElement('div');

    let editButton = document.createElement("button");
    editButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">\n' +
        '  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>\n' +
        '</svg>';
    editButton.onclick = function () {
        alert("EDIT");
    };

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" ' +
        'class="bi bi-trash3" viewBox="0 0 16 16">\n' +
        '  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>\n' +
        '</svg>';

    deleteButton.setAttribute('onclick', 'deleteBlog('+ JSON.stringify(blog) +')');
    deleteOrEditDiv.setAttribute('style','margin-left:205px;') ;

    deleteOrEditDiv.append(deleteButton);
    deleteOrEditDiv.append(editButton);

    return deleteOrEditDiv;

}

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(document).ready(function(){
    readURL = function(input) {}
});

tinymce.init({
    selector: 'textarea',
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
});

$(document).ready(function () {
    $(".bin").click(function () {
        //var datastring = $("#Form").serialize();
        var data = {title: $("#title").val(), date: $("#date").val(), content: tinyMCE.get('content').getContent()};
        console.log(data);
        console.log($("#title").val());
        console.log($("#date").val());
        console.log(tinyMCE.get('content').getContent());
        $.ajax({
            type: "POST",
            url: "http://192.168.100.6:8080/blogs/store",
            data: JSON.stringify(data),
            headers: {
                "Content-Type":"application/json",
                "Accept": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : 'true',
            },
            success: function (data) {
                var obj = JSON.stringify(data);
                $("").append(
                    '</textarea></li><li class="list-group-item active">Result</li><li class="list-group-item">Title: ' +
                    data["form"]["title"] +
                    '</li><li class="list-group-item">Data: ' +
                    data["form"]["data"] +
                    '</li><li class="list-group-item">Content: ' +
                    data["form"]["text"] +
                    "</li></ul></div>"
                );
            },
            error: function () {
                $("").append("Error occured");
            },
        });
    });
});
