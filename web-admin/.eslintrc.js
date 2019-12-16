module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  globals: {
    document: true,
    localStorage: true,
    window: true,
    Vue: true,
  },
  extends: ['plugin:vue/essential', 'eslint-config-prettier'],
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    camelcase: 'off', //命名规范
    'no-extra-boolean-cast': 'off', //禁止不必要的Bool转换
    'arrow-parens': 0, //箭头函数形参加括号
    'accessor-pairs': 2, //有setter时必须getter
    eqeqeq: 2, //消除类型不安全的等式操作符
    'use-isnan': 2, //强制使用IsNaN判断NaN
    'array-callback-return': 2, //数组回调必须return
    'no-unused-expressions': 0, //除对程序状态没有影响的未使用的表达式
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-reserved-keys': 'off',
    'vue/prop-name-casing': 'off',
    'space-before-function-paren': 0, //格式化函数
    'guard-for-in': 0, //for in循环而不过滤循环中的结果时可能出现的意外行为
    'no-restricted-syntax': 0, //不允许用户定义语法
    'no-param-reassign': 0, //防止由功能参数的修改或重新分配引起的意外行为
    'no-plusplus': 0, //不允许使用++ / --
    'ort/extensions': 'off', // 取消对文件扩展名的验证
    'max-len': 0, //每行长度
    'no-multi-assign': 0, //变量多分配
    'no-underscore-dangle': 'off',
    'prefer-destructuring': [
      'error',
      {
        //允许解构
        VariableDeclarator: {
          array: false,
          object: false,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'func-names': 0, // 允许匿名函数
    'no-unused-vars': 0, // 允许声明未使用变量
    'import/no-unresolved': 0,
    'no-useless-escape': 0, //正则转义通知
    'import/no-extraneous-dependencies': 0,
    'prefer-promise-reject-errors': 1, //允许promise使用reject
    'no-shadow': 0, //允许变量共享
    'no-restricted-globals': 0, //允许使用全局参数(location)
    'no-underscore-dangle': 0, //允许使用_划线
    'prefer-rest-params': 1, //允许使用arguments
    'import/extensions': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'vue/no-unused-components': 'off', //关闭属性表达式规则
    'vue/no-dupe-keys': 'off', //相同键名
    'consistent-return': 0, //关闭函数中return的检测
  },
};
