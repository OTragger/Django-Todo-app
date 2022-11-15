$('document').ready(function(){

    task_img = document.querySelectorAll(".task-img");
    task_img.forEach(element => {
        r = Math.ceil(Math.random()*100);
        g = Math.round(Math.random()*100 + 1);
        b = Math.floor(Math.random()*100 + 51);
        element.style.backgroundColor = `rgb(${r},${g},${b})`;
    });





    $('.add-task').click( (e)=>{
        //add new task
    });

    $(".view-task").click((e)=>{
        
        let taskid = e.currentTarget.parentNode.parentNode.dataset['taskid'];
        $.ajax({
            url: `/tasks/${taskid}/details`,
            type:'POST',
            data:{'pk':taskid},
            success:function(response){
                console.log(response)
                $("#title").append(response['title'])

                if (response['description'] == ''){$("#description").append('N/A')}
                else{$("#description").append(response['description'])}
                $("#date").append(new Date(response['time']).toString())
                $(".show-task-details").toggleClass("d-none d-flex");
            }
        });
    });

    $('#close-show-task-details').click(()=>{
        var tit = document.querySelector('#title');
        var desc = document.querySelector("#description");
        var dat = document.querySelector("#date");
        tit.innerHTML ='';
        desc.innerHTML ='';
        dat.innerHTML ='';
        $(".show-task-details").toggleClass("d-none d-flex");
    });

    $('#close-show-task-edit').click(()=>{
        document.querySelector('#edit-task-form').reset();
        $(".show-task-edit").toggleClass("d-none d-flex");
    });

    $("#edit-task-form").submit((e)=>{
        e.preventDefault()

        var pk=document.querySelector("#edit-pk").value;
        var data = {
            'pk':pk,
            'title':document.querySelector("#edit-title").value,
            'description':document.querySelector("#edit-description").value,
            'time':new Date(document.querySelector("#edit-datetime").value).toISOString(),
        }

        $.ajax({
            url:`/tasks/${pk}/edit`,
            type:"POST",
            data:data,
            success:(response)=>{
                if(response.message == 'success'){
                    
                    document.querySelector('#edit-task-form').reset();
                    $(".show-task-edit").toggleClass("d-none d-flex");
                    alert('record successfully updated!');
                }
            }
        });

    });

    $(".edit-task").click((e)=>{
        let taskid = e.currentTarget.parentNode.parentNode.dataset['taskid'];
        $.ajax({
            url: `/tasks/${taskid}/details`,
            type:'POST',
            data:{'pk':taskid},
            success:function(response){
                document.querySelector("#edit-pk").value = response['id'];
                document.querySelector("#edit-title").value = response['title'];
                document.querySelector("#edit-description").value = response['description'];
                document.querySelector("#edit-datetime-output").innerHTML = new Date(response['time']).toString();
                $(".show-task-edit").toggleClass("d-none d-flex");
            }
        });
    });



    // add new task

    //opening add new task modal
    $(".add-task").click(()=>{
        $(".add-new-task").toggleClass("d-none d-flex");
    });

    //closing the modal
    $('#close-add-new-task').click(()=>{
        document.querySelector('#add-new-task-form').reset();
        $(".add-new-task").toggleClass("d-none d-flex");
    });

    //submitting new task
    $("#add-new-task-form").submit((e)=>{
        e.preventDefault()

        var data = {
            'title':document.querySelector("#add-task-title").value,
            'description':document.querySelector("#add-task-description").value,
            'time':new Date(document.querySelector("#add-task-datetime").value).toISOString(),
        }

        $.ajax({
            url:`/tasks/add`,
            type:"POST",
            data:data,
            success:(response)=>{
                if(response.message == 'success'){
                    
                    document.querySelector('#add-new-task-form').reset();
                    $(".add-new-task").toggleClass("d-none d-flex");
                    alert('record successfully added ,reload page');
                    //reload page
                }
            }
        });

    });
});