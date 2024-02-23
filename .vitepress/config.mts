import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base:'/React-vitePresse',
  title: "React ",
  description: "React basic knowledge and advanced",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '基础知识', link: '/' },
      { text: '进阶', link: '/markdown-examples' },
      { text: '下拉例子', 
        items: [
        {
          // 该部分的标题
          text: '基础知识',
          items: [
            { text: '红绿灯问题', link: '/djj' },
            { text: '修复表单数据问题', link: '/dd' }
          ]
        }
      ] }
    ],
    
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  locales: {
    root: {
      label: 'Chinese',
      lang: 'zh-CN'
    },
    en: {
      label: 'English',
      lang: 'en-US', // 可选，将作为 `lang` 属性添加到 `html` 标签中
      link: '/en/guide' // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的
    }
  }
})
