const socket = io('http://localhost:3000');

socket.emit('GUI_TIN_NHAN',"I'm client 007")
socket.on('THONG_BAO',function(data){
    $('#show-event').append('<br>'+data);
})
