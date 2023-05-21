$(onReady)


function onReady() {

    getList();

    $('#inputForm').on('submit', postTask);
    $('#taskView').on('click', '.markBtn', setStatus);
    $('#taskView').on('click', '.removeBtn', deleteTask);
    $('#orderSwap').on('click', toggleOrder);

    orderToggle = 0;

}

let orderToggle = 0;

//function to swap the value of orderToggle when button is clicked
function toggleOrder() {

    if (orderToggle === 0)  {
        orderToggle = 1;
        $('#orderSwap').text('|/');  
    }else {
        orderToggle = 0;
        $('#orderSwap').text(` /|` );  
    }
    getList();
}

//function to request the database information
function getList() {

    console.log('getList');

    $.ajax({
        method: 'get',
        url: '/list/' + orderToggle,
    }).then((response) => {
        renderToDom(response);
        console.log(response);
    }).catch((err) => {
        alert('server request failed');
        console.log('request failed', err);
    });
}

//function put the database information on the DOM
function renderToDom(array) {

    $('#taskView').empty();

    for (let item of array) {

        let time;
        if (item.timeCompleted === null ) {
            time = '';
        }else{
            time = item.timeCompleted;
        }

        let buttonToggle = ``;
        if (item.status) {
            buttonToggle = `<button class="markBtn" data-value="${item.status}">Mark Uncomplete</button>`
        } else {
            buttonToggle = `<button class="markBtn" data-value="${item.status}">Mark Complete</button>`
        }


        $('#taskView').append(`

            <tr id="${item.id}" data-id="${item.id}">
            <td class="taskName">${item.task}</td>
            <td class="taskStatus">${item.status}</td>
            <td class="taskNotes">${item.notes}</td>
            <td class="timeCompleted">${item.timeCreated}</td>
            <td class="timeCreated">${time}</td>
            <td class="markCompleted">${buttonToggle}</td>
            <td class="remove"><button class="removeBtn">Remove</button></td>
            </tr>
            `);

        if (item.status === true) {
            $(`#${item.id}`).css("background-color", "green");
        }

    }
}

//function to send new inputs to the server.
function postTask(event) {

        event.preventDefault();

        let task = $('#inputOne').val();
        let notes = $('#inputTwo').val();

        $.ajax({
            method: 'POST',
            url: '/list',
            data: {
                task: task,
                notes: notes,
            }
        }).then((response) => {
            getList();
            $('#inputOne').val('');
            $('#inputTwo').val('');
        }).catch((err) => {
            alert('request failed');
            console.log('request failed', err);
        });
}

//function send updated values to the server.
function setStatus() {
        let ID = $(this).closest('tr').data('id');
        let currentStatus = $(this).data().value;
        console.log(currentStatus, ID );


        $.ajax({
            method: 'PUT',
            url: '/list/' + ID,
            data: {
                status: currentStatus,
            }
        }).then((response) => {
            getList();
        }).catch((err) => {
            alert('request failed')
            console.log('request failed', err);
        });
}

//function to remove a item from the database
function deleteTask() {

    let ID = $(this).closest('tr').data('id');

    swal({
        title: "Are you sure mate?",
        text: "Once deleted, you will not be able to recover this item",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Scadooosh, Item has been removed!", {
                    icon: "success",
                });

                $.ajax({
                    method: 'DELETE',
                    url: '/list/' + ID,
                }).then((response) => {
                    getList();
                }).catch((err) => {
                    alert('request failed');
                    console.log('request falied', err);
                });

            } else {
                swal("You still have to complete this item.");
            }
        });
}







