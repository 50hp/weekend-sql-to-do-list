$(onReady)


function onReady() {

    getList();



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
                        <td class="timeCompleted">${time}</td>
                        <td class="timeCreated">${item.timeCreated}</td>
                        <td class="markCompleted"><button class="markBtn">Mark Completed</button></td>
                        <td class="remove"><button class="removeBtn">Remove</button></td>
                    </tr>
            `);



        }
}

