import User from '../models/UsersModel.js';

export const verifyUser = async (req, res, next) => {
  // memeriksa apakah sudah login dengan session
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Mohon login ke akun anda!' });
  }
  // mencari user berdasarkan session userId
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  // memeriksa apakah user di temukan
  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });
  // memasukan data ke req
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  // mencari user berdasarkan session userId
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  // memeriksa user apakah ditemukan
  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });
  // memeriksa apakah user rolenya admin
  if (user.role !== 'admin')
    return res.status(403).json({ msg: 'Akses terlarang' });
  next();
};
