let baseUrl = "http://localhost:8088/api/";
let table = null;

$(document).ready(function () {
    table = $('#myTable').DataTable({
        "ajax": {
            "url": baseUrl + "region",
            "type": "GET",
            "dataSrc": "data"
        },
        "columnDefs": [
            {
                "targets": [0],
                "width": "2%"
            },
            {
                "targets": [1],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [2],
                "width": "60%"
            },
            {
                "targets": [3],
                "width": "30%",
                "searchable": false,
                "orderable": false
            }
        ],
        "columns": [
            {
                "data": null,
                "name": "no",
                "autoWidth": true,
                "render": function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { "data": "id", "name": "id", "autoWidth": true },
            { "data": "name", "name": "name", "autoWidth": true },
            {
                "render": function (data, type, full, meta) {

                    return '<a href="#" onclick="Get(' + full.id + ')" title="Edit">Edit</a> | ' +
                        '<a href="#" onclick="Delete(' + full.id + ')" title="Delete">Delete</a>'
                }
            }
        ],
    });

    $("#submit").on("click", function (e) {
        e.preventDefault();
        Submit();
    });
});

function Submit() {
    var id = $("#id").val();

    if (id == "" || id == " ") {
        Post();
    } else {
        Put(id);
    }
}

function Post() {
    var region = new Object();
    region.name = $("#name").val();
    $.ajax({
        url: baseUrl + "region",
        type: "POST",
        data: JSON.stringify(region),
        headers: {
            'Content-Type': 'application/json',
        }
    }).done((result) => {
        if (result.status == 200) {
            Swal.fire(
                'Good job!',
                'Your data has been saved!',
                'success'
            )
            $("#myModal").modal("toggle");
            table.ajax.reload();
        } else if (result.status == 400) {
            Swal.fire(
                'Watch Out!',
                'Duplicate Data!',
                'error'
            )
        }
        Reset();
    }).fail((error) => {
        Swal.fire(
            'Warning!',
            'Check your internet connection!',
            'warning'
        )
        Reset();
    });
}

function Get(id) {
    console.log(id);
    $.ajax({
        url: baseUrl + "region/" + id,
        type: "GET"
    }).done((result) => {
        $("#myModal").modal("show");
        $("#id").val(result.data.id);
        $("#name").val(result.data.name);
    }).fail((error) => {
        console.log(error);
    })
}

function Put(id) {
    var region = new Object();
    region.id = id;
    region.name = $("#name").val();
    $.ajax({
        url: baseUrl + "region",
        type: "PUT",
        data: JSON.stringify(region),
        headers: {
            'Content-Type': 'application/json',
        }
    }).done((result) => {
        if (result.status == 200) {
            Swal.fire(
                'Good job!',
                'Your data has been saved!',
                'success'
            )
            $("#myModal").modal("toggle");
            table.ajax.reload();
        } else if (result.status == 400) {
            Swal.fire(
                'Watch Out!',
                'Duplicate Data!',
                'error'
            )
        }
        Reset();
    }).fail((error) => {
        Swal.fire(
            'Warning!',
            'Check your internet connection!',
            'warning'
        )
        Reset();
    });
}

function Delete(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: baseUrl + "region/" + id,
                type: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).done((result) => {
                if (result.status == 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    table.ajax.reload();
                }
            }).fail((error) => {
                Swal.fire(
                    'Warning!',
                    'Check your internet connection!',
                    'warning'
                )
            });
        }
    })
}

function Reset() {
    $("#name").val("");
    $("#id").val("");
}
