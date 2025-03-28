const Room = require('@models/Room');

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error in getAllRooms:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลห้อง' });
  }
};