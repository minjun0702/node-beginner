export const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }

  return res
    .status(500)
    .json({ status: 500, message: '예상치 못한 에러가 발생했습니다.' });
};

//에러 핸들러로 발생시키려면, router 모든 요청 건에 next를 넣어야 하며,

// try, catch로 감싸줘야함
// try {
//} catch(error) {next(error)};
