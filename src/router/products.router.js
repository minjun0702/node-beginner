import express from 'express';
import { Product } from '../schemas/product.schema.js';

const productsRouter = express.Router();

// 생성
productsRouter.post('/api', async (req, res) => {
  // 상품 정보 파싱하기
  const { name, description, manager, password } = req.body;

  // db에 저장하기
  const newDB = new Product({ name, description, manager, password });
  let data = await newDB.save();
  data = { ...data.toJSON(), password: undefined }; // .toJSON()을 붙이지 않으면 mongodb에서 사용되는 메서드가 전부 풀려서 원하지 않는 값들이 노출됨, 비밀번호 비노출처리

  // 완료메세지 저장하기
  return res
    .status(201)
    .json({ status: 201, message: '상품 생성에 성공했습니다.', data });
});

// 목록 조회
productsRouter.get('/api', (req, res) => {
  //db에서 조회하기
  //완료메세지 반환하기
});

// 상세 조회
productsRouter.get('/api/:id', (req, res) => {
  // 상품 id 파싱하기
  // db에서 조회하기
  //완료메세지 반환하기
});

// 수정
productsRouter.put('/api/:id', (req, res) => {
  // 상품 id 파싱하기
  // 상품 수정 정보 파싱하기
  // db에서 조회하기
  // 비밀번호 일치여부 확인하기
  // db에 갱신하기
  // 완료메세지 반환하기
});

// 삭제
productsRouter.delete('/api/:id', (req, res) => {
  // 상품 id 파싱하기
  // db에서 조회하기
  // 비밀번호 일치여부 확인하기
  // db에서 삭제하기
  // 삭제 후 완료메세지 반환하기
});

export { productsRouter };
