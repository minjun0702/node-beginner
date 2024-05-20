import express from 'express';
import { Product } from '../schemas/product.schema.js';
import { createProductValidator } from '../middlewares/validators/create-product.middleware.js';
import { deleteProductValidator } from '../middlewares/validators/delete-product.middleware.password.js';
import { updateProductValidator } from '../middlewares/validators/updatacreate-product.middleware.js';
const productsRouter = express.Router();

// 생성
productsRouter.post('/api', async (req, res, next) => {
  // 상품 정보 파싱하기
  try {
    const { name, description, manager, password } = req.body;

    const idCheck = await Product.findOne({ name }).exec();
    if (idCheck) {
      return res
        .status(400)
        .json({ status: 400, message: '이미 등록된 상품입니다.' });
    }
    // db에 저장하기
    const newDB = new Product({ name, description, manager, password });
    let data = await newDB.save();
    data = { ...data.toJSON(), password: undefined }; // .toJSON()을 붙이지 않으면 mongodb에서 사용되는 메서드가 전부 풀려서 원하지 않는 값들이 노출됨, 비밀번호 비노출처리

    // 완료메세지 저장하기
    return res
      .status(201)
      .json({ status: 201, message: '상품 생성에 성공했습니다.', data });
  } catch (error) {
    next(error);
  }
});

// 목록 조회
productsRouter.get('/api', async (req, res, next) => {
  //db에서 조회하기
  try {
    const data = await Product.find().sort({ createdAt: 'desc' }).exec();
    //완료메세지 반환하기
    return res
      .status(200)
      .json({ status: 200, message: '상품 목록 조회를 완료하였습니다.', data });
  } catch (error) {
    next(error);
  }
});

// 상세 조회
productsRouter.get('/api/:id', async (req, res, next) => {
  // 상품 id 파싱하기
  try {
    const { id } = req.params;

    // db에서 조회하기
    const data = await Product.findById(id).exec();

    if (!data) {
      return res
        .status(404)
        .json({ status: 404, message: '상품이 존재하지 않습니다.' });
    }

    //완료메세지 반환하기
    return res
      .status(200)
      .json({ status: 200, message: '상품 상세 조회를 성공하였습니다.', data });
  } catch (error) {
    next(error);
  }
});

// 수정
productsRouter.put(
  '/api/:id',
  updateProductValidator,
  async (req, res, next) => {
    // 상품 id 파싱하기
    try {
      const { id } = req.params;
      // 상품 수정 정보 파싱하기
      const { name, description, status, manager, password } = req.body;
      // db에서 조회하기
      const data = await Product.findById(id, { password: true });

      if (!data) {
        return res
          .status(404)
          .json({ status: 404, message: '상품이 존재하지 않습니다.' });
      }

      // 비밀번호 일치여부 확인하기
      const isPassword = password == data.password;

      if (!isPassword) {
        return res
          .status(401)
          .json({ status: 401, message: '비밀번호가 일치하지 않습니다.' });
      }

      const updatedata = {
        name,
        description,
        status,
        manager,
      };

      const datasave = await Product.findByIdAndUpdate(id, updatedata, {
        new: true,
      });

      // 완료메세지 반환하기
      return res
        .status(200)
        .json({ status: 200, message: '상품 수정에 성공했습니다.', datasave });
    } catch (error) {
      next(error);
    }
  },
);

// 삭제
productsRouter.delete(
  '/api/:id',
  deleteProductValidator,
  async (req, res, next) => {
    // 상품 id 파싱하기
    try {
      const { id } = req.params;

      // 패스워드 파싱하기
      const { password } = req.body;
      // db에서 조회하기
      const data = await Product.findById(id, { password: true });

      if (!data) {
        return res
          .status(404)
          .json({ status: 404, message: '상품이 존재하지 않습니다.' });
      }

      // 비밀번호 일치여부 확인하기
      const isPassword = password == data.password;
      if (!isPassword) {
        return res
          .status(401)
          .json({ status: 401, message: '비밀번호가 일치하지 않습니다.' });
      }

      // db에서 삭제하기
      const datasave = await Product.findByIdAndDelete(id);
      // 삭제 후 완료메세지 반환하기
      return res
        .status(200)
        .json({ status: 200, message: '상품 삭제에 성공했습니다.', datasave });
    } catch (error) {
      next(error);
    }
  },
);

export { productsRouter };
