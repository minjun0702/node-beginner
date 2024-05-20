import Joi from 'joi';
import { PRODUCT_STATUS } from '../../constants/product.constant.js';

export const updateProductValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      name: Joi.string().messages({
        // name 의 입력값은 문자열이며 무조건 필요함
        'string.base': '상품명은 문자열이어야 합니다.',
      }),
      description: Joi.string().messages({
        'string.base': '상품명은 문자열이어야 합니다.',
      }),
      manager: Joi.string().messages({
        'string.base': '상품명은 문자열이어야 합니다.',
      }),
      password: Joi.string().required().messages({
        'string.base': '상품명은 문자열이어야 합니다.',
        'any.required': '비밀번호를 입력해주세요',
      }),
      status: Joi.string()
        .valid(...Object.values(PRODUCT_STATUS)) // ['FOR_SALE','SOLE_OUT']
        .messages({
          'string.base': '상품 상태는 문자열이어야 합니다.',
          'any.only': '상품 상태는 [FOR_SALE,SOLE_OUT] 중 하나여야 합니다.',
        }),
    });
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
  // 위의 설정값 중 맞지 않으면 이쪽으로 에러가 발생하고, 에러 미들웨어로 넘어가고, 해당 미들웨어에서도 함수 지정
};
