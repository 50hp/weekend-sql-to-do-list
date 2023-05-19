$(onReady)


function onReady() {

    getList();

    $('#inputForm').on('submit', postTask);
    $('#taskView').on('click', '.markBtn', setStatus);


}



function getList() {
    
    console.log('getList');

    $.ajax({
        method: 'get',
        url: '/list',
    }).then((response) => {
        renderToDom(response);
        console.log(response);
    }).catch((err) => {
        alert('server request failed');
        console.log('request failed', err);
    });
}

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
                    
                     <tr data-id="${item.id}">
                        <td class="taskName">${item.task}</td>
                        <td class="taskStatus">${item.status}</td>
                        <td class="taskNotes">${item.notes}</td>
                        <td class="timeCompleted">${item.timeCreated}</td>
                        <td class="timeCreated">${time}</td>
                        <td class="markCompleted">${buttonToggle}</td>
                        <td class="remove"><button class="removeBtn">Remove</button></td>
                    </tr>
            `);

        }
}

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

function deleteTask() {

    let ID = $(this).closest('tr').data('id');
    
    $.ajax({
        method: 'DELETE',
        url: '/list/' + ID,
    }).then((response) => {
        getList();

}







