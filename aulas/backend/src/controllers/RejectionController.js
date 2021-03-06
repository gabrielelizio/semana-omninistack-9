const Booking = require ('../models/Booking');

module.exports = {

  async store(req, res ){

    const { booking_id } = req.params;

    const booking = await Booking.findById(booking_id).populate('spot');

    const bookingUserSocket = req.connectedUsers[booking.user];

    if (bookingUserSocket){
      req.io.to(bookingUserSocket).emit('booking_response',booking);
    }


    booking.approved = false;

    await booking.save();

    return res.json(booking)
  }
}
