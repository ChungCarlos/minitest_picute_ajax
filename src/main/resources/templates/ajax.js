// Hiển thị form thêm mới picture...
function showFormCreate(){
    let form = ``;
    form += `<form>
    <table>
        <tr>
            <td>Name</td>
            <td><input type="text" id="name" placeholder="Name Picture"></td>
        </tr>
        <tr>
            <td>Height</td>
            <td><input type="text" id="height" placeholder="Height"></td>
        </tr>
        <tr>
            <td>Width</td>
            <td><input type="text" id="width" placeholder="Width"></td>
        </tr>
        <tr>
            <td>Material</td>
            <td><input type="text" id="material" placeholder="Material"></td>
        </tr>
        <tr>
            <td>Description</td>
            <td><input type="text" id="description" placeholder="Description"></td>
        </tr>
        <tr>
            <td>Price</td>
            <td><input type="text" id="price" placeholder="Price"></td>
        </tr>
        <tr>
            <td>Category</td>
            <td><select id="category"></select></td>
        </tr>

        <tr>
            <td><input type="submit" value="Add" onclick="addNewPicture()"></td>
        </tr>
    </table>
</form>`
    document.getElementById("display").innerHTML=form;
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/category",
        success(data) {
            let text = ``
            for (let i = 0; i < data.length; i++) {
                text += `<option value="${data[i].id},${data[i].name_category}">${data[i].name_category}</option>`
            }
            document.getElementById("category").innerHTML = text;
        }
    })
}

// Thêm 1 picture...
function addNewPicture(){
    // Lấy dữ liệu...
    let name = $('#name').val();
    let height = $('#height').val();
    let width = $('#width').val();
    let material = $('#material').val();
    let description = $('#description').val();
    let price = $('#price').val();
    let cate =$("#category").val().split(",")
    let id = cate[0]
    let name_category = cate[1]
    let categories = [{id,name_category}]
    let newPicture= {
        name: name,
        height: height,
        width: width,
        material: material,
        description: description,
        price: price,

        categories: categories
    };

    // Gọi ajax
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data:JSON.stringify(newPicture),
        // Tên API
        url: "http://localhost:8888/pictures",
        // Xử lý khi thành công
        success() {
            showAll()
        }
    });
}

// Hiện list picture
function showAll(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8888/pictures",
        success(data){
            console.log(data);

            let context = "";
            context += `<table border="1">
<tr>
<td>ID</td>
<td>Name</td>
<td>Height</td>
<td>Width</td>
<td>Material</td>
<td>Description</td>
<td>Price</td>
<td>Category</td>
<td>Operation</td>
</tr>`
            for (let i = 0; i < data.length; i++) {
                context += `<tr>
        <td>${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].height}</td>
        <td>${data[i].width}</td>
        <td>${data[i].material}</td>
        <td>${data[i].description}</td>
        <td>${data[i].price}</td>
        <td>`;

                for (let j = 0; j < data[i].categories.length; j++) {
                    context += `${data[i].categories[j].name_category}`;

                    if (j < data[i].categories.length - 1) {
                        context += ",";
                    }
                }

                context += `</td>
        <td><button onclick="viewPicture(${data[i].id})">View</button>||<button onclick="updatePicture(${data[i].id})">Update</button>||<button onclick="deletePicture (${data[i].id})">Delete</button></td>

                </tr>`;
            }

            context +=`</table>`
            document.getElementById("display").innerHTML=context;
        }
    })
}

// Xoá theo id của picture...
function deletePicture(id){
    if(confirm("You Sure delete ???")) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8888/pictures/" + id,
            success() {
                showAll();
            }
        });
    }

}

// View chi tiết picture...
function viewPicture(id) {
    $.ajax({
        type: "PATCH",
        url: "http://localhost:8888/pictures/" + id,
        success(data) {
            console.log(data);
            let context = `<table border="1">
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Height</td>
          <td>Width</td>
          <td>Material</td>
          <td>Description</td>
          <td>Price</td>
          <td>Categories</td>
        </tr>
        <tr>
          <td>${data.id}</td>
          <td>${data.name}</td>
          <td>${data.height}</td>
          <td>${data.width}</td>
          <td>${data.material}</td>
          <td>${data.description}</td>
          <td>${data.price}</td>
          <td>`;
            // Duyệt mảng...
            data.categories.forEach((category) => {
                context += `${category.name_category}, `;
            });

            // Xóa dấu phẩy cuối cùng nếu có
            if (data.categories.length > 0) {
                context = context.slice(0, -2);
            }

            context += `</td>
        </tr>
      </table>`;

            document.getElementById("display").innerHTML = context;
        },
    });
}


function update(code){
    let name = $('#name').val();
    let height = $('#height').val();
    let width = $('#width').val();
    let material = $('#material').val();
    let description = $('#description').val();
    let price = $('#price').val();
    let cate =$("#category").val().split(",")
    let id = cate[0]
    let name_category = cate[1]
    let categories = [{id,name_category}]
    let newPicture= {
        name: name,
        height: height,
        width: width,
        material: material,
        description: description,
        price: price,

        categories: categories
    };
    // Gọi ajax
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data:JSON.stringify(newPicture),
        // Tên API
        url: "http://localhost:8888/pictures" + code,
        // Xử lý khi thành công
        success() {
            showAll()
        }

    });
    event.preventDefault();
}

function updatePicture(id){
    $.ajax({
        type: "PATCH",
        url: "http://localhost:8888/pictures/" + id,
        success(data) {
            let context = ``
            context += `<table>
<tr>
<td>Name</td>
<td><input type="text" value="${data.name}" id="name"></td>
</tr>
<tr>
<td>Height</td>
<td><input type="text" value="${data.height}" id="height"></td>
</tr>
<tr>
<td>Width</td>
<td><input type="text" value="${data.width}" id="width"></td>
</tr>
<tr>
<td>Material</td>
<td><input type="text" value="${data.material}" id="material"></td>
</tr>
<tr>
<td>Description</td>
<td><input type="text" value="${data.description}" id="description"></td>
</tr>
<tr>
<td>Price</td>
<td><input type="text" value="${data.price}" id="price"></td>
</tr>
<tr>
<td><select id="category"></select></td>
</tr>
<tr><td><button onclick="update(${data.id})">Add</button></td></tr>
</table>`
            document.getElementById("display").innerHTML = context;
            $.ajax({
                type: "GET",
                url: "http://localhost:8888/category",
                success(arr) {
                    let text = ``
                    for (let i = 0; i < arr.length; i++) {
                        text += `<option value="${arr[i].id},${arr[i].name_category}">${arr[i].name_category}</option>`
                    }
                    document.getElementById("category").innerHTML = text
                }
            })
        }
    })
}

// Tìm kiếm theo tên của picture...
function showFormSearchName() {
    let form = "";
    form += `
    <span>Search by picture name</span><br>
    <input type="text" id = "search">
    <button onclick="searchByName()">Search</button><br>`;
    document.getElementById("display").innerHTML = form;
}
// Tìm kiếm theo category...
function showFormSearchCategory() {
    let form = "";
    form += `
<span>Search by category</span><br>
<select id = "search_category"></select>
<button onclick="searchByCategory()">Search</button>`;
$.ajax({
    type: "GET",
    url: "http://localhost:8888/category",
    success: function (data) {
        console.log(data)
        let categories = "";
        for (let i = 0; i < data.length; i++) {
            categories += `<option value="${data[i].id}">${data[i].name_category}</option>`;
        }
        document.getElementById("search_category").innerHTML = categories;
    }
})
    document.getElementById("display").innerHTML = form;
}
function searchByName() {
    let search = document.getElementById("search").value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/pictures/search?name=" + search,
        success: function (data) {
            console.log(data);
            let pictures = "";
            pictures += `
            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Width</th>
                    <th>Material</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Categories</th>
                    <th>Operation</th>
                    </tr>`;
            for (let i = 0; i < data.length; i++) {
                pictures += `<tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].height}</td>
                    <td>${data[i].width}</td>
                    <td>${data[i].material}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].price}</td>
                    <td>`;
                for (let j = 0; j < data[i].categories.length; j++) {
                    pictures += `${data[i].categories[j].name_category}`;
                    if (j < data[i].categories.length - 1) {
                        pictures += ",";
                    }
                }
                pictures += `</td>
                   <td><button onclick="viewPicture(${data[i].id})">View</button>||<button onclick="updatePicture(${data[i].id})">Update</button>||<button onclick="deletePicture (${data[i].id})">Delete</button></td>
                </tr>`;
            }
            pictures += `</table>`;
            document.getElementById("display").innerHTML = pictures;
        }
    });
}

function searchByCategory(){
    let searchCategory = document.getElementById("search_category").value;
    $.ajax({
        type:"GET",
        url:"http://localhost:8888/pictures/searchcategory/" + searchCategory,
        success: function (data) {
            console.log(data);
            let category = "";
            category += `
            <table border="1">
            <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Width</th>
                    <th>Material</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Categories</th>
                    <th>Operation</th>
                    </tr>`;
            for (let i = 0; i < data.length; i++) {
                category += `<tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].height}</td>
                    <td>${data[i].width}</td>
                    <td>${data[i].material}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].price}</td>
                    <td>`;
                for (let j = 0; j < data[i].categories.length; j++) {
                    category += `${data[i].categories[j].name_category}`;
                    if (j < data[i].categories.length - 1) {
                        category += ",";
                    }
                }
                category += `</td>
                   <td><button onclick="viewPicture(${data[i].id})">View</button>||<button onclick="updatePicture(${data[i].id})">Update</button>||<button onclick="deletePicture (${data[i].id})">Delete</button></td>
                </tr>`;
            }
            category += `</table>`;
            document.getElementById("display").innerHTML = category;
        }
    })
}