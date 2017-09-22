const socket = io('http://localhost:3000');

$('#div-chat').hide();

socket.on('DANH_SACH_ONLINE', arrUserInfo => {
    $('#div-chat').show();
    $('#div-dangky').hide();

    arrUserInfo.forEach(user => {
        const { ten, peerId } = user;
        $('#ulUsers').append(`<li id="${peerId}">${ten}</li>`);
    });

    socket.on('CO_NGUOI_DUNG_MOI', user => {
        const { ten, peerId } = user;
        $('#ulUsers').append(`<li id="${peerId}">${ten}</li>`);
    });

    socket.on('AI_DO_NGAT_KET_NOI', peerId => {
        $(`#${peerId}`).remove();
    })
});

socket.on('DANG_KY_THAT_BAI', () =>{
    alert('Vui long chon username khac');
});

function openStream(){
    const config = {audio:false,video:true};
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream){
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
}

openStream()
    .then(stream => playStream('localStream',stream))
    .catch(function(err){
        console.log("Exception:"+err);
    });

const peer = new Peer({key:'114yulrez53a0pb9'});

//Show peer id on page
peer.on('open', id => {
    $('#mypeer').append(id);
    $('#btnSignup').click(() => {
        const username = $('#txtUsername').val();
        socket.emit('NGUOI_DUNG_DANG_KY',{ten : username, peerId: id});
    })
});

//Caller
// $('#btnCall').click(() => {
//     const id = $('#remoteid').val();
//
// });

peer.on('call', call =>{
    openStream()
        .then(stream => {
            call.answer(stream);
            playStream('remoteStream',stream);
            call.on('stream', remoteStream('localStream',remoteStream));
        })
});

$('#ulUsers').on('click','li',function(){
    const id = $(this).attr('id');
    openStream()
        .then(stream => {
            playStream('localStream',stream);
            const call = peer.call(id, stream); //Open peer connection
            call.on('stream',remoteSream => playStream('remoteStream',remoteSream));
        })
})

