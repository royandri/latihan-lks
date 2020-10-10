<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>JSON - CRUD</title>

    <style>
        table.border, table.border th, table.border td {
            border: 1px solid black;
            border-collapse: collapse;
        }

        table.border th, table.border td {
            padding: 3px 10px;
        }
    </style>
</head>
<body>

<form>
    <table>
        <tr>
            <td>Name</td>
            <td>
                <input style="display: none;" id="product-id" type="text">
                <input id="product-name" type="text">
            </td>
        </tr>
        <tr>
            <td>Price</td>
            <td><input type="number" id="product-price" type="text"></td>
        </tr>
        <tr>
            <td></td>
            <td nowrap>
                <button id="btn-create" type="button" onclick="create()">Create</button>
                <button style="display: none;" id="btn-update" type="button" onclick="handleEdit()">Update</button>
                <button style="display: none;" id="btn-cancel" type="button" onclick="cancel()">Cancel</button>
            </td>

        </tr>
    </table>
</form>

<table class="border">
    <thead>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody id="table-product">

    </tbody>
</table>

<script>
    products = [];

    document.addEventListener('DOMContentLoaded', function() {
        getData().then(data => {
            products = data;
            generateDataTable(data);
        });

    }, false);

    async function getData() {
        let response  = await fetch('products.json');
        let data = await response.json();

        return data;
    }

    function generateDataTable(arrProduct) {
        let table = document.getElementById("table-product");
        table.innerHTML = "";

        arrProduct.forEach((product) => {
            const productData = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>
                        <button onclick="edit('${product.id}', '${product.name}', '${product.price}')">Edit</button>
                        <button onclick=del('${product.id}')>Del</button>
                    </td>
                </tr>
            `;

            table.insertAdjacentHTML('beforeend', productData);
        })
    }
    
    function edit(id, name, price) {
        document.getElementById('product-id').value = id;
        document.getElementById('product-name').value = name;
        document.getElementById('product-price').value = price;
        
        document.getElementById('btn-create').style.display = "none";
        document.getElementById('btn-update').style.display = "inline-block";
        document.getElementById('btn-cancel').style.display = "inline-block";
    }

    function handleEdit() {
        const id = document.getElementById('product-id');
        const name = document.getElementById('product-name');
        const price = document.getElementById('product-price');

        const generateEditedProduct = products.map((product) => {
            if(parseInt(product.id) === parseInt(id.value)) {
                return {
                    id: id.value,
                    name: name.value,
                    price: price.value
                }
            }

            return product;
        })

        products = generateEditedProduct;
        generateDataTable(generateEditedProduct);
        cancel();
        alert("Success update product");
    }

    function cancel() {
        document.getElementById('product-id').value = "";
        document.getElementById('product-name').value = "";
        document.getElementById('product-price').value = "";
        
        document.getElementById('btn-create').style.display = "inline-block";
        document.getElementById('btn-update').style.display = "none";
        document.getElementById('btn-cancel').style.display = "none";
    }

    function del(id) {
        const generateProduct = products.filter(product => product.id != id); 

        products = generateProduct;
        generateDataTable(generateProduct);

        alert("Success remove product");

    }

    function create() {
        let name = document.getElementById("product-name");
        let price = document.getElementById("product-price");

        if(name.value === "" || price.value === "") {
            alert("Product name or price can't be empty.");
            return;
        }

        const id = parseInt(products[products.length-1].id) + 1;

        let newProduct = [
            ...products,
            {
                id: id,
                name: name.value,
                price: parseInt(price.value)
            }
        ];

        
        product = newProduct;
        generateDataTable(newProduct);

        if(newProduct[newProduct.length-1].id === id) {
            alert("Success add new product");
        }
    }
</script>

</body>
</html>
