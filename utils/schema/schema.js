import { z } from 'zod'

export const rgSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '電子郵箱為必填' })
      .email({ message: '請填寫正確的電子郵箱' }),
    password: z
      .string()
      .min(1, { message: '密碼為必填' })
      .min(8, { message: '密碼至少8個字元' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/, {
        message: '密碼需包含大小寫英文字母、數字、及特殊字元 @$!%*?&#',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密碼不一致',
    path: ['confirmPassword'], //message on confirmPassword
  })

export const pfSchema = z
  .object({
    pname: z
      .string()
      .min(1, { message: '姓名為必填' })
      .min(2, { message: '請填寫正確的姓名' }),
    sex: z.enum(['male', 'female'], { message: '請選擇性別' }),
    mobile: z
      .string()
      .min(1, { message: '手機號碼為必填' })
      .length(10, { message: '請填寫正確的手機號碼' }) // 確保長度為 10
      .regex(/^09\d{8}$/, { message: '手機號碼格式錯誤' }), // 確保是台灣手機號碼格式
    intro: z.string().optional(),
    item: z.string().max(15, { message: '喜愛運動項目最多15個字元' }),
    goal: z.array(z.string()).optional(),
    status: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.status === true) {
        // 確保 intro 在公開狀態下是必填且至少有 30 個字元
        return data.intro && data.intro.trim().trim('').length >= 30;
      }
      return true; // 若 status 為 false，不進行檢查
    },
    {
      message: '狀態為公開時，自我簡介需為必填，且至少需要30個字元',
      path: ['intro'], // 錯誤訊息將顯示在 intro 欄位
    }
  )
