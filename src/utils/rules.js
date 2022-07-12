export const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    {
      min: 5,
      max: 50,
      message: '文章标题长度需在5到50个字符',
      trigger: 'blur'
    }
  ],
  content: [
    {
      validator (rule, value, callback) {
        if (value === '' || value === '<p></p>') {
          callback(new Error('请输入文章内容'))
        } else {
          callback()
        }
      }
    }
  ],
  channel_id: [{ required: true, message: '请选择文章频道' }]


}