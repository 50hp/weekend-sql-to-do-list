$(onReady)


function onReady() {

    getList();

    $('#inputForm').on('submit', postTask);



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

        $('#taskView').append(`
                    
                     <tr id="${item.id}">
                        <td class="taskName">${item.task}</td>
                        <td class="taskStatus">${item.status}</td>
                        <td class="taskNotes">${item.notes}</td>
                        <td class="timeCompleted">${item.timeCreated}</td>
                        <td class="timeCreated">${time}</td>
                        <td class="markCompleted"><button class="markBtn">Mark Completed</button></td>
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
        }).catch((err) => {
            alert('request failed');
            console.log('request failed', err);
        });
}

function setStatus() {

    $.ajax({
        method: 'PUT',
        url: '/list/' + ID,
        data: {
            status:
        }
    }).then((response) => {
        getList();
