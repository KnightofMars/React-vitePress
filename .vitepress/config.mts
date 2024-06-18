import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
import { en } from './en'
export default defineConfig({
  base:'/react-vitePress/',
  title: "React ",
  description: "React basic knowledge and advanced",
  themeConfig: {
    logo: '/React.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'vitepress构建', link: '/zh/vitepress-bulid' },
      { text: '每日一道面试题', link: '/zh/interview' },
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
          { text: 'markdown例子', link: '/markdown-examples' },
          { text: '跑起来的api接口', link: '/api-examples' },
          { text: 'vitePress', link: '/vitepress' },
          { text: 'vitepress构建', link: '/zh/vitepress-bulid' },
          { text: '每日一道面试题', link: '/zh/interview' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      message: '睡个好觉比爱重要',
      copyright: 'Copyright © 2024-present MarsKnight'
    },
    search: {
      provider: 'local',
      options:{
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
        }
        }
      }
    },
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '去GitHub上编辑此页'
    },
    outline: {
      label: '页面导航'
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdatedText: "最近更新时间"
  },
  lastUpdated: true,
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      description:'让我看看这个描述是什么'
    },
    en: {
      label: 'English',
      ...en
    }
  },
  head: [['link', { rel: 'icon', href: '/react-vitePress/favicon.ico' }]]
})
