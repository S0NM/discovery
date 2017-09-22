const io = require('socket.io')(3000);
const arrUserInfo = [];

io.on('connection', socket => {
    socket.on('NGUOI_DUNG_DANG_KY', user => {
        const isExist =  arrUserInfo.some(e => e.ten === user.ten);
        socket.peerId = user.peerId;
        if (isExist){
            return socket.emit('DANG_KY_THAT_BAI');
        }
        arrUserInfo.push(user);

        //Thong bao lai cho nguoi dung danh sach online
        socket.emit('DANH_SACH_ONLINE',arrUserInfo);
        socket.broadcast.emit('CO_NGUOI_DUNG_MOI',user)
    });

    socket.on('disconnect', () =>{
        const index = arrUserInfo.findIndex(user => user.peerId = socket.peerId);
        arrUserInfo.splice(index,1);
        io.emit('AI_DO_NGAT_KET_NOI',socket.peerId);
    });
});
