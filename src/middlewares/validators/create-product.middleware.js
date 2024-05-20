import Joi from 'joi';

export const createProductValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      name: Joi.string().required().messages({
        // name 의 입력값은 문자열이며 무조건 필요함
        'string.base': '상품명은 문자열이어야 합니다.',
        'any.required': '상품명을 입력해주세요',
        // 오류 메세지 설정하는 것
      }),
      description: Joi.string().required().messages({
        'string.base': '상품명은 문자열이어야 합니다.',
        'any.required': '상품 설명을 입력해주세요',
      }),
      manager: Joi.string().required().messages({
        'string.base': '상품명은 문자열이어야 합니다.',
        'any.required': '담당자를 입력해주세요',
      }),
      password: Joi.string().required().messages({
        'string.base': '상품명은 문자열이어야 합니다.',
        'any.required': '비밀번호를 입력해주세요',
      }),
    });
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
  // 위의 설정값 중 맞지 않으면 이쪽으로 에러가 발생하고, 에러 미들웨어로 넘어가고, 해당 미들웨어에서도 함수 지정
};
